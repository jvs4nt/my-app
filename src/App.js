import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';

function App() {

  const [usuarios, setUsuarios] = useState([]);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8000/users').then(response => {
      setUsuarios(response.data.users);
    }).catch(error => console.log(error));
  }, [])

  function salvarUsuarios() 
  {
    let body = {
      name: nome,
      email: email,
      password: senha
    }

    axios.post("http://localhost:8000/users", body).then(response => {
      if (response.status === 201) {
        alert("usuario criado com sucesso");
      }
    }).catch(error => console.log(error));
  }

  return (
    <div>
      <form onSubmit={ event => {
        event.preventDefault();
        salvarUsuarios();
      }}>
        <label>Nome:</label>
        <input name="nome" onChange={e => setNome(e.target.value)} />
        <label>Email:</label>
        <input type='email' name="email" onChange={e => setEmail(e.target.value)} />
        <label>Senha:</label>
        <input type='password' name="senha" onChange={e => setSenha(e.target.value)} />
        <button type='submit'>Enviar</button>
      </form>

      <table border={1}>
        <thead>
          <tr>
          <th>nome</th>
          <th>email</th>
          <th>data de criação</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map( usuario => {
          return <tr>
                    <td>{usuario.name}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.created_at}</td>
                </tr>
          })}
          
        </tbody>
      </table>
    </div>
  );
}

export default App;
