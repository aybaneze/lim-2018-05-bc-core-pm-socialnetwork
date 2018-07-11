


var provider = new firebase.auth.GoogleAuthProvider();
$('#google').click(function () {
    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            console.log(result.user);
            $('#root').hide();
            $('#data').show();
        });
});
document.getElementById('facebook').addEventListener("click", loginFace);
function loginFace() {
    const log = new firebase.auth.FacebookAuthProvider();
    log.addScope('public_profile');
    firebase.auth().signInWithPopup(log)
<<<<<<< HEAD
        .then(result => {
            $('#root').hide();
            $('#data').show();
            console.log(`${result.user.email}  Iniciaste Sesion`)})

        .catch(error => console.log(`Error ${error.code}:${error.message}`))
}
document.getElementById('ingresa').addEventListener("click", loginEmailIngreso);
function loginEmailIngreso() {
    const emailIngreso = document.getElementById("email").value;
    const contrasenaIngreso = document.getElementById("contrasena").value;
    firebase.auth().signInWithEmailAndPassword(emailIngreso, contrasenaIngreso)
        .then(result => { 
            $('#root').hide();
            $('#data').show();
            console.log(`${result.user.email}  Iniciaste Sesion`)})
        .catch(error => console.log(`Error ${error.code}:${error.message}`))
}
=======
        .then(function (result) {
            console.log(result.user);
            $('#root').hide();
            $('#data').append("<img src = '" + result.user.photoURL + "'/>").show();

        });
})

$('#ingresa').click(function(){
    const emailIngreso = document.getElementById("email").value;
    const contrasenaIngreso = document.getElementById("contrasena").value;
    firebase.auth().signInWithEmailAndPassword(emailIngreso, contrasenaIngreso)
        .then(function (result) {
            console.log(result.user);
            $('#root').hide();
            $('#data').append("<img src = '" + result.user.photoURL + "'/>").show();
});
})
>>>>>>> 10965c707fbc1fbadc0af52e17584371e2aa3c32
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
document.getElementById('cerrar').addEventListener("click", cerrar);
function cerrar(){
    firebase.auth().signOut()
        .then(function result(){
            console.log('saliendo...')
            $('#data').hide();
            $('#root').show();
        });
        } 
