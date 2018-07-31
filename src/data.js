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
            $('#data').show();
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
            $('#data').show();
           
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
            $('#data').show();

        
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


var imagenes=new Array(
    ['imagenes/frase1.png','http://www.lawebdelprogramador.com/cursos/'],
    ['imagenes/frase2.png','http://www.lawebdelprogramador.com/foros/'],
    ['imagenes/frase3.png','http://www.lawebdelprogramador.com/pdf/'],
    ['imagenes/frase4.png','http://www.lawebdelprogramador.com/pdf/'],
);

   // obtenemos un numero aleatorio entre 0 y la cantidad de imagenes que hay
    var index=Math.floor((Math.random()*imagenes.length));
    // cambiamos la imagen y la url
    document.getElementById("imagen").src=imagenes[index][0];
    document.getElementById("link").href=imagenes[index][1];

// Función que se ejecuta una vez cargada la página
onload= function()
{
    // Cargamos una imagen aleatoria
    rotarImagenes();
    // Indicamos que cada 5 segundos cambie la imagen
    setInterval(rotarImagenes,4000);
}






