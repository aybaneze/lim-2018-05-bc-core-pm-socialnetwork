import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
      user:null
    };
    this.loginGoogle = this.loginGoogle.bind(this);
    this.cerrar = this.cerrar.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.renderLgin2=this.renderLgin2.bind(this);
    this.renderLog3=this.renderLog3.bind(this);
  }
  
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
       this.setState({user})
    })
  }
  renderLogin(){
    //si esta logeado
    if (this.state.user){
      
      return (
        <div>
          <img src={this.state.user.photoURL} alt={this.state.user.displayName}></img>
          <p>Hola {this.state.user.displayName}!</p>
          <button className="btn btn-dark my-2 my-sm-0" onClick={this.cerrar}>Cerrer Sesion </button>
        </div>
      );
    }else { 
      return (
      <button className="btn btn-dark my-2 my-sm-0" onClick={this.loginGoogle}>Login con Google</button>
    );}
  }
  renderLgin2(){
    if (this.user) {

      return (
        <div>
          <img src={this.state.user.photoURL} alt={this.user}></img>
          <p>Hola {this.state.user.displayName}!</p>
          <button className="btn btn-dark my-2 my-sm-0" onClick={this.cerrar}>Cerrer Sesion </button>
        </div>
      );
    } else {
      return (
        <button className="btn btn-dark my-2 my-sm-0" onClick={this.loginFace}>Login con Facebook</button>
      );
    }
}
renderLog3(){
  if (this.state.user) {

    return (
      <div>
        <img src={this.state.user.photoURL} alt={this.user}></img>
        <p>Hola {this.state.user.displayName}!</p>
        <button className="btn btn-dark my-2 my-sm-0" onClick={this.cerrar}>Cerrer Sesion </button>
      </div>
    );
  } else {
    return (
      <div className="form-block">
        <input id="email" type="email" placeholder="ingresa tu email" className="form-control mr-sm-2"></input>
        <input id="contrasena" type="password" placeholder="ingresa tu password" className="form-control mr-sm-2"></input>
        <button className="btn btn-dark my-2 my-sm-0" onClick={this.loginEmail}>Registrarse</button>
        <button className="btn btn-dark my-2 my-sm-0" onClick={this.loginEmailIngreso}>Ingresa</button></div>
    );
  }
}
  loginFace() {
    const log = new firebase.auth.FacebookAuthProvider();
    log.addScope('public_profile');
    firebase.auth().signInWithPopup(log)
      .then(result => console.log(`${result.user.email}  Iniciaste Sesion`))
      .catch(error => console.log(`Error ${error.code}:${error.message}`))
  }
  loginGoogle() {
    const log = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(log)
      .then(result => console.log(`${result.user.email}  Iniciaste Sesion`))
      .catch(error => console.log(`Error ${error.code}:${error.message}`))
  }
  loginEmail() {
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;

    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
      .then(result => {
        const user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function () {
          // enviando Email
          console.log('enviando correo---')
        }).catch(function (error) {
          console.log(error)
        });
      })
      .catch(error => console.log(`Error ${error.code}:${error.message}`))
  }
  
  loginEmailIngreso() {
    const emailIngreso = document.getElementById("email").value;
    const contrasenaIngreso = document.getElementById("contrasena").value;
    firebase.auth().signInWithEmailAndPassword(emailIngreso, contrasenaIngreso)
      .then(result => console.log(`${result.user.email }  Iniciaste Sesion`))
      .catch(error => console.log(`Error ${error.code}:${error.message}`))
  }
  

cerrar(){
  firebase.auth().signOut()
  .then(result=> console.log('saliendo...'))
  .catch(error=> console.log('error'))
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> ¡FreeW! </h1>
        </header>
        <div className="form-block">
        <h4> Registro de Usuarios </h4>
        <nav className="navbar navbar-light bg-light">
            
                {this.renderLogin()}
                {this.renderLgin2()}
                {this.renderLog3()}
            
          </nav>
          </div>
      </div>
      
    );
  }
}
export default App;