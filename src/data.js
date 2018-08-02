const register = document.getElementById('register');
register.addEventListener('click',()=>{
    document.getElementById('outForm').style.display='block';
    document.getElementById('inForm').style.display='none';
})
const ingreso = document.getElementById('ingreso');
ingreso.addEventListener('click',()=>{
    document.getElementById('inForm').style.display='block';
    document.getElementById('outForm').style.display='none';
})

window.onload = () =>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Inicio Logueado');
           $('#Profile').append("<img style='height:106px;width:106px;border-radius:100px;float:center' src='"+user.photoURL+"'/>");
           $('#UserCount').append("<p>"+user.displayName+"</p>");
        //    $('#ProfilePhoto').append("<img style='height:200px;width:200px;float:center' src='"+user.photoURL+"'/>");
        //    $('#nameUser').append("<p style='font-size:30px'>"+user.displayName+"</p>");
        } else {
           console.log('no esta logeado');
        }
    });
 }

function guardaDatos(user) {
    var usuario = {
        uid: user.uid,
        nombre: user.displayName,
        email: user.email,
        foto: user.photoURL
    }
    
    firebase.database().ref('freww/' + user.uid)
        .set(usuario)
}

var provider = new firebase.auth.GoogleAuthProvider();
$('#google').click( () => {
    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            console.log(result.user);
            guardaDatos(result.user);
            $('#root').hide();
            window.location.href = 'indexMuro.html'
        });
})




const log = new firebase.auth.FacebookAuthProvider();
$('#facebook').click(() => {
    log.addScope('public_profile');
    firebase.auth().signInWithPopup(log)
        .then(function (result) {
            console.log(result.user);
            guardaDatos(result.user);
            $('#root').hide();
            window.location.href= 'indexMuro.html'
           
        });
})

$('#ingresa').click(()=>{
    const emailIngreso = document.getElementById("email").value;
    const contrasenaIngreso = document.getElementById("contrasena").value;
    if(/^[a-zA-Z0-9._-]+@+[a-z]+.+[a-z]/.test(emailIngreso)){
    firebase.auth().signInWithEmailAndPassword(emailIngreso, contrasenaIngreso)
        .then(function (result) {
            console.log(result.user);
            guardaDatos(result.user);
            $('#root').hide();
            window.location.href = 'indexMuro.html';

        
}).catch(function (error) {
    alert("contraseña incorrecta");
});}
else{
    alert("correo electronico incorrecto");
}
        })

document.getElementById('registrar').addEventListener("click", loginEmail);
function loginEmail() {
    const email1 = document.getElementById("email1").value;
    const pass = document.getElementById("pass").value;
if(/^[a-zA-Z0-9._-]+@+[a-z]+.+[a-z]/.test(email1)){
    firebase.auth().createUserWithEmailAndPassword(email1, pass)
        .then(result => {
            const user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function () {
                // enviando Email
                console.log('enviando correo---')
                alert("Ya estas registradx!");
            }).catch(function (error) {
                console.log(error)
            });
        })
        .catch(error => console.log(`Error ${error.code}:${error.message}`))
    }else{
        alert("correo electronico incorrecto");
    }
}






