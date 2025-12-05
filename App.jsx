import React, { useState } from "react";
import "./App.css";

function App() {
  const [uf, setUf] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");

  async function buscarDDD() {
    setErro("");
    setResultado(null);

    if (!uf.trim()) {
      setErro("Por favor, digite o DDD (ex: 81, 11).");
      return;
    }

    try {
      const ufFormatada = uf.trim().toUpperCase();
      const response = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ufFormatada}`);

      if (!response.ok) {
        throw new Error("DDD não encontrado.");
      }

      const data = await response.json();
      setResultado(data);
    } catch (error) {
      setErro("Erro ao buscar DDD. Verifique a UF e tente novamente.");
    }
  }

  return (
    <div className="container">
      <h1>Consulta de DDD por Estado</h1>

      <input
        type="text"
        value={uf}
        onChange={(e) => setUf(e.target.value)}
        placeholder="Digite o DDD (ex: 81)"
      />
      <br />

      <button onClick={buscarDDD}>Buscar</button>

      {/* Mensagens */}
      {erro && <p className="erro">{erro}</p>}

      {resultado && (
        <div className="resultado-box">
          <h2>📞 DDD: {resultado.ddd}</h2>
          <p><strong>Estado:</strong> {resultado.state}</p>

          <h3>Cidades:</h3>
          <ul>
            {resultado.cities.map((cidade, index) => (
              <li key={index}>{cidade}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;


