
var provider = new firebase.auth.GoogleAuthProvider();
$('#google').click(function () {
    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            console.log(result.user);
            $('#root').hide();
            $('#data').append("<img src = '" + result.user.photoURL + "'/>")
        });
});

var log = new firebase.auth.FacebookAuthProvider();
$('#facebook').click(function(){
    log.addScope('public_profile');
    firebase.auth().signInWithPopup(log)
        .then(function(result){
            console.log(result.user);
            $('#root').hide();
            $('#data').append("<img src = '" + result.user.photoURL + "'/>")
        })
})
$('#ingresa').click(function(){
    const emailIngreso = document.getElementById("email").value;
    const contrasenaIngreso = document.getElementById("contrasena").value;
    firebase.auth().signInWithEmailAndPassword(emailIngreso, contrasenaIngreso)
    $('#root').hide();
    $('#data').append('Bienvenido a FreeW  de mujeres para mujeres')
})
document.getElementById('registrar').addEventListener("click", loginEmail);
function loginEmail() {
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;

    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
        .then(result => {
            const user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function () {
                // enviando Email
                alert("Te mandamos un correo de validacion de Usuario por favor revisa tu correo")
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
