document.getElementById('google').addEventListener("click", loginGoogle);
function loginGoogle() {
    const log = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(log)
        .then(result => console.log(`${result.user}  Iniciaste Sesion`))
        .catch(error => console.log(`Error ${error.code}:${error.message}`))
}
document.getElementById('facebook').addEventListener("click", loginFace);
function loginFace() {
    const log = new firebase.auth.FacebookAuthProvider();
    log.addScope('public_profile');
    firebase.auth().signInWithPopup(log)
        .then(result => console.log(`${result.user.email}  Iniciaste Sesion`))
        .catch(error => console.log(`Error ${error.code}:${error.message}`))
}
document.getElementById('ingresa').addEventListener("click", loginEmailIngreso);
function loginEmailIngreso() {
    const emailIngreso = document.getElementById("email").value;
    const contrasenaIngreso = document.getElementById("contrasena").value;
    firebase.auth().signInWithEmailAndPassword(emailIngreso, contrasenaIngreso)
        .then(result => console.log(`${result.user.email}  Iniciaste Sesion`))
        .catch(error => console.log(`Error ${error.code}:${error.message}`))
}
document.getElementById('registrar').addEventListener("click", loginEmail);
function loginEmail() {
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

