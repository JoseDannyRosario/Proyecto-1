const { fromEvent, of, BehaviorSubject } = rxjs;
const {
  map,
  debounceTime,
  filter,
  distinctUntilChanged,
  switchMap,
  catchError,
} = rxjs.operators;
const { ajax } = rxjs.ajax;

String.prototype.toTitleCase = function () {
  return this.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
};

const searchInput = document.querySelector("#searchInput");
const errorDiv = document.querySelector("#error");
const detailsDiv = document.querySelector("#details");
const suggestPokemon = document.querySelector("#suggestPokemon");

const baseUrl = "https://pokeapi.co/api/v2/pokemon";
let allPokemon = [];
const loading$ = new BehaviorSubject(true);

ajax.getJSON(`${baseUrl}?limit=1000`).subscribe({
  next: (response) => {
    console.log(response);
    allPokemon = response.results;
    loading$.next(false);
  },
  error: (error) => {
    console.error(error);
    loading$.next(false);
  },
});

fromEvent(searchInput, "input")
  .pipe(
    debounceTime(300),
    map((event) => event.target.value.toLowerCase()),
    filter((query) => query.length > 0),
    distinctUntilChanged(),
    switchMap((query) => {
      errorDiv.textContent = "";
      detailsDiv.textContent = "";

      if (loading$.value || !query) {
        suggestPokemon.style.display = "none";
      }

      const pokemonMatches = allPokemon.filter((p) => p.name.includes(query));
      return of(pokemonMatches);
    })
  )
  .subscribe({
    next: (matches) => {
      if (!matches || !matches.length) {
        suggestPokemon.style.display = "none";
        suggestPokemon.innerHTML = "";
      }

      suggestPokemon.innerHTML = matches
        .map((item) => {
          return `<option value="${
            item.name
          }">${item.name.toTitleCase()}</option>`;
        })
        .join("");
      suggestPokemon.style.display = "block";
    },
    error: (error) => {
      if (error) {
        console.log(error);
      }
    },
  });

fromEvent(suggestPokemon, "change").subscribe({
  next: () => {
    const pokemonName = suggestPokemon.value;
    console.log(pokemonName);
    getPokemonDetails(pokemonName);
  },
});

function getPokemonDetails(pokemonName) {
  ajax
    .getJSON(`${baseUrl}/${pokemonName}`)
    .pipe(
      catchError((error) => {
        errorDiv.textContent = `Error: ${error.message}`;
        return of(null);
      })
    )
    .subscribe((data) => {
      if (!data) return;
      showPokemon(data);
      suggestPokemon.style.display = "none";
    });
}

function showPokemon(pokemon) {
  console.log(pokemon);
  if (pokemon) {
    detailsDiv.innerHTML = `
    <h3>${pokemon.name.toTitleCase()}</h3>
    <p>Id: ${pokemon.id}</p>
    <p>Types: ${pokemon.types.map((item) => item.type.name).join(", ")}</p>
    <img src="${pokemon.sprites.other.showdown.front_default}" />
    `;
  }
}

function logError() {
  errorDiv.textContent = `Error: ${error}`;
}