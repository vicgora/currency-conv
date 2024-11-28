import './App.css';
import React, { useState, useRef, useEffect } from 'react';

function App() {
    const [resultadoUSD, setResultadoUSD] = useState(0);
    const [resultadoEUR, setResultadoEUR] = useState(0);
    const [tasaCambioUSD, setTasaCambioUSD] = useState(0); // Valor por defecto
    const [tasaCambioEUR, setTasaCambioEUR] = useState(0); // Valor por defecto
    const inputEuro = useRef(null);
    const inputDolar = useRef(null);

    useEffect(() => {
        fetch(
            'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json'
        )
            .then((response) => response.json())
            .then((data) => {
                setTasaCambioUSD(data.eur.usd);
            })
            .catch((error) =>
                console.error('Error al obtener la tasa de cambio:', error)
            );
    }, []);

    useEffect(() => {
        fetch(
            'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json'
        )
            .then((response) => response.json())
            .then((data) => {
                setTasaCambioEUR(data.usd.eur);
            })
            .catch((error) =>
                console.error('Error al obtener la tasa de cambio:', error)
            );
    }, []);

    const convertirUSD = () => {
        const cantidad = inputEuro.current.value;
        setResultadoUSD(cantidad * tasaCambioUSD);
        console.log(cantidad * tasaCambioUSD);
    };

    const convertirEUR = () => {
        const cantidad = inputDolar.current.value;
        setResultadoEUR(cantidad * tasaCambioEUR);
        console.log(cantidad * tasaCambioEUR);
    };

    return (
        <div id="main">
            <div id="eur-usd">
                <div id="titulo">
                    <h2>Conversor Euro-Dólar</h2>
                </div>
                <div id="euro">
                    <input type="text" size={4} ref={inputEuro} />
                    <strong>€</strong>
                </div>
                <div id="convertir">
                    <button onClick={convertirUSD}>Convertir</button>
                </div>
                <div id="resultado">
                    <h3>{resultadoUSD} $</h3>
                </div>
            </div>
            <div id="usd-eur">
                <div id="titulo">
                    <h2>Conversor Dólar-Euro</h2>
                </div>
                <div id="dolar">
                    <input type="text" size={4} ref={inputDolar} />
                    <strong>$</strong>
                </div>
                <div id="convertir">
                    <button onClick={convertirEUR}>Convertir</button>
                </div>
                <div id="resultado">
                    <h3>{resultadoEUR} €</h3>
                </div>
            </div>
            <footer id="pie">
                <a href="https://github.com/fawazahmed0/exchange-api?tab=readme-ov-file">
                    API de tasa de cambio
                </a>
            </footer>
        </div>
    );
}

export default App;
