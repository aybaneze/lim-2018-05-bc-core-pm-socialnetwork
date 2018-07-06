import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';


class App extends Component {
  loginGoogle() {
    const log = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(log)
      .then(result => console.log(`${result.user.email}ha iniciado sesion`))
      .catch(error => console.log(`Error ${error.code}:${error.message}`))
  }
  loginEmail() {
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;
    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
      .catch(error => console.log(`Error ${error.code}:${error.message}`))
  }
  loginEmailIngreso() {
    const emailIngreso = document.getElementById("emailIngreso").value;
    const contrasenaIngreso = document.getElementById("contrasenaIngreso").value;
    firebase.auth().signInWithEmailAndPassword(emailIngreso, contrasenaIngreso)
      .catch(error => console.log(`Error ${error.code}:${error.message}`))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> ¡FreeW! </h1>
        </header>
        <p className="App-intro">
          <button className="btn btn-dark my-2 my-sm-0" onClick={this.loginGoogle}>Login con Google</button>
        </p>
        <h4> Registro de Usuarios </h4>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand">Navbar</a>
          <input id="email" type="email" placeholder="ingresa tu email" className="form-control mr-sm-2"></input>
          <input id="contrasena" type="password" placeholder="ingresa tu password" className="form-control mr-sm-2"></input>
          <button className="btn btn-dark my-2 my-sm-0" onClick={this.loginEmail}>Registrarse</button>
          </nav>
      </div>
      
    );
  }
}
export default App;