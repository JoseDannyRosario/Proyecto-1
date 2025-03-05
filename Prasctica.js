const { ajax } = rxjs.ajax;
function practicaejemplos () {
    console.log ('--- Practica usando Users ---(fetch)');
    fetch('https://jsonplaceholder.typicode.com/users/5')
    .then ((response)=> {
        if (!response.ok) {
            throw new Error (`HTTP error! estado: ${response.status}`); 
        }
        return response.json();
    })
    .then ((datos)=> {
        console.log('Datos Completados:', datos);
    })
    .catch ((error)=> {
        console.error('error en el llamado de fetch', error);
    })
    .finally (()=> {
        console.log('Ejecucion Finalizada con fetch\n');
    });
}
function practicaEjemplosCallback
(email, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open ('Abrir', email);
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data=JSON.parse(xhr.responseText);
            callback (null, data); 
        }
        else { 
    callback(new Error(`Ejecucion Fallida: ${xhr.status}`), null);
    };
    xhr.onerror = () => {
        callback(new Error('Conexion Fallida'), null);
    };
    xhr.send();
}}
async function practicaEjemplosAsyncAwait() {
    console.log ('---practicaDeJava---');
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/5');
        if(!response.ok) {
            throw new Error (`HTTP Ejecucion Fallida: ${response.status}`);
        }
        const datos = await response.json();
        console.log('Datos Obtenidos', datos);
    } catch (error) {
        console.error('Falla en Async/Await', error);
    } finally {
        console.log ('Operacion Async/Await Ejecutada\n');
    }
}
function practicaObservable (){
    
ajax.getJSON("https://jsonplaceholder.typicode.com/users/5")
    .subscribe({
     next: (response) => console.log(response),
     error: (error) => console.error("Fallido:". error)
    });
}
