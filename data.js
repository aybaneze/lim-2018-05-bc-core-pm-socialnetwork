
<<<<<<< HEAD
=======


>>>>>>> 01e48ac236c1fd65618cd14b84cd7027036b8c66
var provider = new firebase.auth.GoogleAuthProvider();
$('#google').click(function () {
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            console.log(result.user);
            $('#root').hide();
<<<<<<< HEAD
            $('#data').append("<img src = '" + result.user.photoURL + "'/>").show();
           
=======
            $('#data').show();
>>>>>>> 01e48ac236c1fd65618cd14b84cd7027036b8c66
        });
})
const log = new firebase.auth.FacebookAuthProvider();
$('#facebook').click(function(){
    log.addScope('public_profile');
    firebase.auth().signInWithPopup(log)
<<<<<<< HEAD
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
=======
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
>>>>>>> 01e48ac236c1fd65618cd14b84cd7027036b8c66
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
           
            $('#root').show();

        });
        } 