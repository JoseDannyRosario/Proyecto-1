import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { count } from 'console';

function App() {

  const [nombre, setNombre] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [contador, setContador] = useState(0);
  const [timer, setTimer] = useState(0);

  const manejarContador = (count:any) => {
    setNombre(count.target.value);
    setMostrarMensaje(true);
  };

  const mostrarSaludo = () => {
    setMostrarMensaje(true);
    setTimer(0);
  };

  useEffect(() => {
      const timerID = setInterval(() => setTimer((t) => t+1), 1000);
      return () => clearInterval(timerID);

  }, []);

  useEffect(() => {
    console.log(`Cambio el contador: ${contador}`);

  }, [contador]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>CONTADOR REACT</h1>
      </header>

      <div>
        <input
          type="text"
          value={nombre}
          onChange={manejarContador}
        />
        <button onClick={mostrarSaludo}>Mostrar saludo!</button>

        {mostrarMensaje && (
          <p>{nombre}, tiempo transcurrido: {timer} segundos desde el ultimo saludo.</p>
        )}

        <h2>Contador: {contador}</h2>
        <button onClick={() => setContador(contador + 1)}>Aumentar</button>
        <button onClick={() => setContador(contador - 1)}>Decrementar</button>  
      </div>
    </div>
  );
}

export default App;
