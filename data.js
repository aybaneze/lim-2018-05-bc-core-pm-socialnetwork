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
            $('#data').show()
            $('#Profile').append("<img style='height:106px;width:106px;border-radius:100px;float:center' src='"+result.user.photoURL+"'/>");
            $('#UserCount').append("<p>"+result.user.displayName+"</p>");
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
            $('#Profile').append("<img style='height:106px;width:106px;border-radius:100px;float:center' src='"+result.user.photoURL+"'/>");
            $('#UserCount').append("<p>"+result.user.displayName+"</p>");
        });
})

$('#ingresa').click(()=>{
    const emailIngreso = document.getElementById("email").value;
    const contrasenaIngreso = document.getElementById("contrasena").value;
    firebase.auth().signInWithEmailAndPassword(emailIngreso, contrasenaIngreso)
        .then(function (result) {
            console.log(result.user);
            guardaDatos(result.user);
            $('#root').hide();
            $('#data').append("<img src ='imagenes/sin_perfil.png' />").show();
});
})
document.getElementById('registrar').addEventListener("click", loginEmail);
function loginEmail() {
    const email1 = document.getElementById("email1").value;
    const pass = document.getElementById("pass").value;

    firebase.auth().createUserWithEmailAndPassword(email1, pass)
        .then(result => {
            const user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function () {
                // enviando Email
                console.log('enviando correo---')
                guardaDatos(result.user);
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
// firebase.initializeApp({
//     apiKey: "AIzaSyAd-_QsITc2hsVEPLgnB2TSVLe2xkfT8fs",
//     authDomain: "nuestra-red-social.firebaseapp.com",
//     projectId: "nuestra-red-social"
// });

// //Initialize Cloud Firestore through Firebase


// var db = firebase.firestore();

// function guardar() {

//     let post = document.getElementById('post').value;
//     db.collection("users").add({
//         first: post
//     })
//         .then(function (docRef) {
//             console.log("Document written with ID: ", docRef.id);
//             document.getElementById("post").value = '';
//         })
//         .catch(function (error) {
//             console.error("Error adding document: ", error);
//         });

// }   

// // leer datos
// let content = document.getElementById('content');
// db.collection("users").onSnapshot((querySnapshot) => {
//     console.log(querySnapshot)
//     content.innerHTML = '';
//     querySnapshot.forEach((doc) => {
//         console.log(doc)
//         content.innerHTML +=`
//            <div id=${doc.id}></div>  
//                 <div class="w3-container w3-card w3-white w3-round w3-margin"><br>
//                 <img src="imagenes/sin_perfil.png" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
//                 <span class="w3-right w3-opacity">16 min</span>
//                 <h4>Andrea Ybañez</h4><br>
//                 <div>${doc.data().first}</div>
//                 <hr class="w3-clear">
//                 <button id="fb-root" data-layout="button_count" type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i>  Like</button> 
//                 <button id="plusone-div" type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i>  Comment</button> 
//                 <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "eliminar('${doc.id}')">Elimina</button>           
//                 <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "editar('${doc.id}','${doc.data().first}')">Editar</button>
//                 </div> 
//                 </div><br>`
//     });
// });

// //borrar datos

// function eliminar(id){
//     db.collection("users").doc(id).delete().then(function () {
//         console.log("Document successfully deleted!");
//     }).catch(function (error) {
//         console.error("Error removing document: ", error);
//     });
// }


// //editar
// function editar(id,post){
//     document.getElementById('post').value = post;

//     let boton = document.getElementById('botonpostea');
//     boton.innerHTML = 'Editar';

//     boton.onclick = function () {
//         var washingtonRef = db.collection("users").doc(id);

//         let post = document.getElementById('post').value;

//         return washingtonRef.update({
//             first: post
//         })
//             .then(function () {
//                 console.log("Document successfully updated!");
//                 boton.innerHTML = 'Comparte';
//             })
//             .catch(function (error) {
//                 // The document probably doesn't exist.
//                 console.error("Error updating document: ", error);
//             });
//     }
// }

//  //div donde se registra el usuario

// var provider1 = new firebase.auth.GoogleAuthProvider();
// $('#google1').click( () => {
//     firebase.auth().signInWithPopup(provider1)
//         .then(function (result) {
//             var user=result.user;
//             writeUserData(user.userId, user.displayName, user.email, user.photoURL)
//             $('#root').hide();
//             $('#data').append("<p>"+result.user.displayName+"</p>"+"<img src = '" + result.user.photoURL + "'/>").show();
         
           
//         });
// })
// const log1 = new firebase.auth.FacebookAuthProvider();
// $('#facebook1').click(() => {
//     log1.addScope('public_profile');
//     firebase.auth().signInWithPopup(log1)
//         .then(function (result) {
//             console.log(result.user);
//             $('#root').hide();
//             $('#data').append("<p>"+result.user.displayName+"</p>"+"<img src = '" + result.user.photoURL + "'/>").show();
//             $('#Profile').append("<img style='height:106px;width:106px;border-radius:100px;float:center' src='"+result.user.photoURL+"'/>");
//             $('#UserCount').append("<p>"+result.user.displayName+"</p>");

//         });
// })

// $('#ingresa1').click(()=>{
//     const emailIngreso1 = document.getElementById("email1").value;
//     const contrasenaIngreso1 = document.getElementById("pass").value;
//     firebase.auth().signInWithEmailAndPassword(emailIngreso1, contrasenaIngreso1)
//         .then(function (result) {
//             console.log(result.user);
//             $('#root').hide();
//             $('#data').append("<img src ='imagenes/sin_perfil.png' />").show();
// });
// })







var imagenes=new Array(
    ['imagenes/frase1.png','http://www.lawebdelprogramador.com/cursos/'],
    ['imagenes/frase2.png','http://www.lawebdelprogramador.com/foros/'],
    ['imagenes/frase3.png','http://www.lawebdelprogramador.com/pdf/'],
    ['imagenes/frase4.png','http://www.lawebdelprogramador.com/pdf/'],
);
//  Funcion para cambiar la imagen y link 
function rotarImagenes()
{   // obtenemos un numero aleatorio entre 0 y la cantidad de imagenes que hay
    var index=Math.floor((Math.random()*imagenes.length));
    // cambiamos la imagen y la url
    document.getElementById("imagen").src=imagenes[index][0];
    document.getElementById("link").href=imagenes[index][1];
}
// Función que se ejecuta una vez cargada la página
onload= function()
{
    // Cargamos una imagen aleatoria
    rotarImagenes();
    // Indicamos que cada 5 segundos cambie la imagen
    setInterval(rotarImagenes,4000);
}






