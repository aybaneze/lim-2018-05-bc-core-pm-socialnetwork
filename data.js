window.onload = ( ) =>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Inicio Logueado');
           $('#Profile').append("<img style='height:106px;width:106px;border-radius:100px;float:center' src='"+user.photoURL+"'/>");
           $('#UserCount').append("<p>"+user.displayName+"</p>");
           $('#root').hide();
           $('#data').show()

           var myUserId = firebase.auth().currentUser.uid;
           var topUserPostsRef = firebase.database().ref('user-posts/' + myUserId).orderByChild('starCount');


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


const inGoogle= ()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            console.log(result.user);
            guardaDatos(result.user);
          
         
        });
}



const inFacebook = () => {
    const log = new firebase.auth.FacebookAuthProvider();
    log.addScope('public_profile');
    firebase.auth().signInWithPopup(log)
        .then(function (result) {
            console.log(result.user);
            guardaDatos(result.user);
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

botoncerrar.addEventListener('click',()=>{
    firebase.auth().signOut()
    .then(function(){
        console.log('cerro sesion');
        $('#data').hide();
        $('#root').show();
       
    }).catch(function(error){
        console.log('error al cerrar sesion');
    });
});


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
   
    updates['/freww-posts/' + uid + '/' + newPostKey] = postData;
    firebase.database().ref().update(updates);
    return newPostKey;
}

botonpostea.addEventListener('click',()=>{
    var userId = firebase.auth().currentUser.uid;

    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        const newPost= writeNewPost(userId,post.value);
        console.log(snapshot)
        content.innerHTML +=`
        <div id=${snapshot.id}></div>  
             <div class="w3-container w3-card w3-white w3-round w3-margin"><br>
             <img src="imagenes/perfil.png" class="w3-left w3-circle w3-margin-right" style="width:60px" onclick="document.getElementById('modal01').style.display='block'">
             <div id="modal01" class="w3-modal w3-animate-zoom" onclick="this.style.display='none'">
                       <img class="w3-modal-content" style="width:30%;margin-left:450px" style="margin:40px" src="imagenes/perfil.png">
                   </div>
             <span class="w3-right w3-opacity">16 min</span>
             <h4>Andrea Ybañez</h4><br>
             <div>${snapshot.newPost}</div>
             <hr class="w3-clear">
             <button id="fb-root" data-layout="button_count" type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> Me Gusta</button> 
             <button id="plusone-div" type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i> Comentar</button> 
             <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "eliminar('${snapshot.id}')"><i class="fa fa-close"></i> Elimina</button>           
             <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "editar('${snapshot.id}','${snapshot.newPost}')"><i class="fa fa-pencil"></i> Editar</button>
             </div> 
             </div><br>`
})

  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  // ...
});
    
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









