window.onload = ( ) =>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Inicio Logueado');
            
           $('#Profile').append("<img style='height:106px;width:106px;border-radius:100px;float:center' src='"+user.photoURL+"'/>");
           $('#UserCount').append("<p>"+user.displayName+"</p>");
            $('#root').hide();
            $('#data').show()
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
const inGoogle= ()=>{
    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            console.log(result.user);
            guardaDatos(result.user);
            $('#root').hide();
            $('#data').show()
         
        });
}


const log = new firebase.auth.FacebookAuthProvider();
const inFacebook = () => {
    log.addScope('public_profile');
    firebase.auth().signInWithPopup(log)
        .then(function (result) {
            console.log(result.user);
            guardaDatos(result.user);
            $('#root').hide();
            $('#data').show();
        });
}







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



function cerrar() {
    firebase.auth().signOut()
        .then(function result() {
            console.log('saliendo...')
            window.location.href = 'index.html'
            $('#root').show();
        });
} 




// let content = document.getElementById('content');
// db.collection("users").onSnapshot((querySnapshot) => {
//     console.log(querySnapshot)
//     content.innerHTML = '';
//     querySnapshot.forEach((doc) => {
//         content.innerHTML +=`
//            <div id=${doc.id}></div>  
//                 <div class="w3-container w3-card w3-white w3-round w3-margin"><br>
//                 <div id='prof' class="w3-left w3-circle w3-margin-right" style="width:60px"></div>
//                 <span class="w3-right w3-opacity">16 min</span>
//                 <div id='nam'></div><br>
//                 <div>${doc.data().first}</div>
//                 <hr class="w3-clear">
//                 <button id="fb-root" data-layout="button_count" type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="far fa-thumbs-up"></i> Me Gusta</button> 
//                 <button id="plusone-div" type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i>  Comentar</button> 
//                 <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "eliminar('${doc.id}')"><i class="far fa-trash-alt"></i>Elimina</button>           
//                 <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "editar('${doc.id}','${doc.data().first}')"><i class="far fa-edit"></i> Editar</button>
//                 </div> 
//                 </div><br>`
//     });
// });


function writeNewPost(uid, body) {
    // A post entry.
    var postData = {
      uid: uid,
      body: body,
    };
  
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    postData.id = newPostKey;
    updates['/freww/' + newPostKey] = postData;
    updates['/freww-posts/' + uid + '/' + newPostKey] = postData;
  
    firebase.database().ref().update(updates);
    return newPostKey;

}
function editar  (postId, postData) {
    const updates = {};
    updates['/posts/' + postId] = postData;
    firebase.database().ref('/posts/' + postId).update(postData);
    //return firebase.database().ref().update(updates);
    return true;
}



let post=document.getElementById('post');
let content=document.getElementById('content');
const botonpostea=document.getElementById('botonpostea');

botonpostea.addEventListener('click',()=>{
    let userId=firebase.auth().currentUser.uid;
    console.log(userId);
    content.innerHTML= '';
    const newPost= writeNewPost(userId,post.value);
    content.innerHTML+=`
                
                    <div class="w3-container w3-card w3-white w3-round w3-margin"><br>
                    <div id='prof' class="w3-left w3-circle w3-margin-right" style="width:60px"></div>
                    <span class="w3-right w3-opacity">16 min</span>
                    <div id=${newPost}>${post.value}</div><br>
                    <hr class="w3-clear">
                    <button id="fb-root" data-layout="button_count" type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="far fa-thumbs-up"></i> Me Gusta</button> 
                    <button id="plusone-div" type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i>  Comentar</button> 
                    <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "eliminar('${newPost}')"><i class="far fa-trash-alt"></i>Elimina</button>           
                    <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "editar()"><i class="far fa-edit"></i> Editar</button>
                    </div> 
                    </div><br>`
    return firebase.database().ref().update(updates);
                })



















// // leer datos
// let content = document.getElementById('content');
// db.collection("users").onSnapshot((querySnapshot) => {
//     console.log(querySnapshot)
//     content.innerHTML = '';
//     querySnapshot.forEach((doc) => {
//         content.innerHTML +=`
//            <div id=${doc.id}></div>  
//                 <div class="w3-container w3-card w3-white w3-round w3-margin"><br>
//                 <img src="imagenes/perfil.png" class="w3-left w3-circle w3-margin-right" style="width:60px" onclick="document.getElementById('modal01').style.display='block'">
//                 <div id="modal01" class="w3-modal w3-animate-zoom" onclick="this.style.display='none'">
//                           <img class="w3-modal-content" style="width:30%;margin-left:450px" style="margin:40px" src="imagenes/perfil.png">
//                       </div>
//                 <span class="w3-right w3-opacity">16 min</span>
//                 <h4>Andrea Ybañez</h4><br>
//                 <div>${doc.data().first}</div>
//                 <hr class="w3-clear">
//                 <button id="fb-root" data-layout="button_count" type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> Me Gusta</button> 
//                 <button id="plusone-div" type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i> Comentar</button> 
//                 <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "eliminar('${doc.id}')"><i class="fa fa-close"></i> Elimina</button>           
//                 <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "editar('${doc.id}','${doc.data().first}')"><i class="fa fa-pencil"></i> Editar</button>
//                 </div> 
//                 </div><br>`
//     });
// });

// // borrar datos

function eliminar(id){
    db.collection("users").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}



// //editar
function editar(id,post){
    document.getElementById('post').value = post;

    let boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function () {
        var Ref = db.collection("users").doc(id);

        let post = document.getElementById('post').value;

        return Ref.update({
            first: post
        })
            .then(function () {
                console.log("ya subio");
                boton.innerHTML = 'postear';
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
}









