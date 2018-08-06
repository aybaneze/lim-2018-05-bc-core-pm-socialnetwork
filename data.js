window.onload = () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            data.classList.remove("hiden");
            Init.classList.add("hiden");

             Profile.innerHTML="<img style='height:106px;width:106px;border-radius:100px;float:center' src='" + user.photoURL + "'/>";
            UserCount.innerHTML="<p>" + user.displayName + "</p>";   
           
          
            console.log('Inicio sesion srta')
        } else {
            Init.classList.remove("hiden");
            data.classList.add('hiden');
            console.log('Inicio sesion srta')
        }
      });
}

<<<<<<< HEAD
function writeUserData(userId, name, email, photoURL) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : photoURL,
      nombre: state.name
    });
  }

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
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
    return firebase.database().ref().update(updates);
  }
=======
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
>>>>>>> c81f1a9ad1768a2b152e630974dd54424c4dd364

const registerFunction = () =>{
firebase.auth().createUserWithEmailAndPassword( email1.value , pass.value)
.then(function(){
    state.name = name.value;
    guardaDatos(result.user);
    console.log('se creo el usuario');
    alert("Usted está registradx")
})
.catch(function(error) {
    console.log(error.code , error.message );
  });
}

const signinFunction = () => {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then ( function (){
        guardaDatos(result.user);
        console.log('inicio sesión');
    })
    .catch(function(error) {
        console.log(error.code , error.message)
      });

}

const logoutFunction = () =>{
    firebase.auth().signOut().then(function () {
        console.log('cerraste Sesion srta')
            Init.classList.remove("hiden");
            data.classList.add("hiden");
        }).catch(function(error){
            console.log('error al cerrar sesion');
        })
}

const inGoogle = () =>{
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
    guardaDatos(result.user);
    console.log('inicie sesion con google');
    var user = result.user;
    writeUserData(user.uid, user.displayName, user.email, user.photoURL);
  }).catch(function(error) {
     var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    // ...
  });
}

const inFacebook = () =>{
    var provider = new firebase.auth.FacebookAuthProvider();
provider.setCustomParameters({
    'display' : 'popup'
});
    firebase.auth().signInWithPopup(provider).then(function(result){
        guardaDatos(result.user);
        console.log('inicie sesion con facebook')
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}



const postear = () => {
    let userId = firebase.auth().currentUser.uid;
    const newPost = writeNewPost(userId, post.value); 

    let btnUpdate = document.createElement("button");
    btnUpdate.setAttribute("value","update");
    btnUpdate.setAttribute("type","button");
    let btnDelete = document.createElement("button");
    btnDelete.setAttribute("value","delete");
    btnDelete.setAttribute("type","button");
    let contPost = document.createElement("div");
    let textArea = document.createElement ("textarea");
    textArea.setAttribute("id",newPost);

    textArea.innerHTML = post.value;

btnDelete.addEventListener('click', () =>{

    firebase.database().ref().child('/user-post/'+ userId + '/' + newPost).remove();
    firebase.database().ref().child('/post/'+ userId + '/' + newPost).remove();

    while( postMessage.firstChild) post.removeChild(post.firstChild);
    alert('post eliminado');
    reload_page();
})

btnUpdate.addEventListener('click', ()=>{
    const newUpdate = document.getElementById(newPost);
    const nwePostUpdate = {
        body : newUpdate.value,
    }

    let updateUser = {};
    let updatePost = {};

    updateUser['/user-post/' + userId + '/' + newPost] =nwePostUpdate;
    updatePost['/post/' + newPost] = nuevoPost;

    firebase.database().ref().update(updateUser);
    firebase.database().ref().update(updatePost);
});

contPost.appendChild(textArea);
contPost.appendChild(btnUpdate);
contPost.appendChild(btnDelete);
content.appendChild(contPost);


}

function reload_page(){
    window.location.reload();
}


// window.onload = () => {
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             console.log('Inicio Logueado');
//             $('#Profile').append("<img style='height:106px;width:106px;border-radius:100px;float:center' src='" + user.photoURL + "'/>");
//             $('#UserCount').append("<p>" + user.displayName + "</p>");
//             $('#root').hide();
//             $('#data').show()
//         } else {
//             console.log('no esta logeado');
//         }
//     });

// }

<<<<<<< HEAD
// function guardaDatos(user) {
//     var usuario = {
//         uid: user.uid,
//         nombre: user.displayName,
//         email: user.email,
//         foto: userphotoURL
//     }
=======
>>>>>>> c81f1a9ad1768a2b152e630974dd54424c4dd364


// var provider = new firebase.auth.GoogleAuthProvider();
// const inGoogle = () => {
//     firebase.auth().signInWithPopup(provider)
//         .then(function (result) {
//             console.log(result.user);
//             guardaDatos(result.user);
//             $('#root').hide();
//             $('#data').show()

//         });
// }


// const log = new firebase.auth.FacebookAuthProvider();
// const inFacebook = () => {
//     log.addScope('public_profile');
//     firebase.auth().signInWithPopup(log)
//         .then(function (result) {
//             console.log(result.user);
//             guardaDatos(result.user);
//             $('#root').hide();
//             $('#data').show();
//         });
// }

// $('#ingresa').click(() => {
//     const emailIngreso = document.getElementById("email").value;
//     const contrasenaIngreso = document.getElementById("contrasena").value;
//     firebase.auth().signInWithEmailAndPassword(emailIngreso, contrasenaIngreso)
//         .then(function (result) {
//             console.log(result.user);
//             guardaDatos(result.user);
//             $('#root').hide();
//             $('#data').append("<img src ='imagenes/sin_perfil.png' />").show();
//         });
// })


// function loginEmail() {
//     const email1 = document.getElementById("email1").value;
//     const pass = document.getElementById("pass").value;
//     firebase.auth().createUserWithEmailAndPassword(email1, pass)
//         .then(result => {
//             const user = firebase.auth().currentUser;
//             user.sendEmailVerification().then(function () {
//                 // enviando Email
//                 console.log('enviando correo---')
//                 guardaDatos(result.user);
//             }).catch(function (error) {
//                 console.log(error)
//             });
//         })
//         .catch(error => console.log(`Error ${error.code}:${error.message}`))
// }



// function cerrar() {
//     firebase.auth().signOut()
//         .then(function result() {
//             console.log('saliendo...')
//             window.location.href = 'index.html'
//             $('#root').show();
//         });
// }


// function writeNewPost(uid, body) {
//     console.log('write');
//     // A post entry.
//     var postData = {
//         uid: uid,
//         body: body,
//     };

//     // Get a key for a new Post.
//     var newPostKey = firebase.database().ref().child('posts').push().key;

//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     var updates = {};
//     updates['/freww-posts/' +postData.uid + '/' + newPostKey] = postData;
//     updates['/posts/' + uid + '/' + newPostKey] = postData;
//     firebase.database().ref().update(updates);
//     return newPostKey;
// }


// const botonpostea = document.getElementById('botonpostea');

// const promesita = firebase.database().ref('/posts').once('value');
// const div = document.createElement('div');


// function valposteos() { 
//     const posteos = promesita.then(function (snapshot) {

//         Object.keys(snapshot.val()).map(item => {
//             const p = document.createElement('p');

//             p.innerHTML = content.innerHTML += `
//                     <div class="w3-container w3-card w3-white w3-round w3-margin"><br>
//                     <div id='prof' class="w3-left w3-circle w3-margin-right" style="width:60px"></div>
//                     <span class="w3-right w3-opacity">16 min</span>
//                     <div id=${item}>${snapshot.val()[item].body}</div><br>
//                     <hr class="w3-clear">
//                     <button id="fb-root" data-layout="button_count" type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="far fa-thumbs-up"></i> Me Gusta</button> 
//                     <button id="plusone-div" type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i>  Comentar</button> 
//                     <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "eliminar()"><i class="far fa-trash-alt"></i>Elimina</button>           
//                     <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "editar()"><i class="far fa-edit"></i> Editar</button>
//                     </div> 
//                     </div><br>`;
//             return div.appendChild(p)
//         })
//         return snapshot.val() ;
//     });
//     console.log(posteos);
// }
// });


// function writeNewPost(uid, body) {
//     console.log('write');
//     // A post entry.
//     var postData = {
//         uid: uid,
//         body: body,
//     };

//     // Get a key for a new Post.
//     var newPostKey = firebase.database().ref().child('posts').push().key;

<<<<<<< HEAD
//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     var updates = {};
//     updates['/freww-posts/' +postData.uid + '/' + newPostKey] = postData;
//     updates['/posts/' + uid + '/' + newPostKey] = postData;
//     firebase.database().ref().update(updates);
//     return newPostKey;
// }


// // console.log(valposteos());
// // content.appendChild(div)


//         Object.keys(snapshot.val()).map(item => {
//             const p = document.createElement('p');

=======
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/freww-posts/' + postData.uid + '/' + newPostKey] = postData;
    updates['/posts/' + uid + '/' + newPostKey] = postData;
    firebase.database().ref().update(updates);
    return newPostKey;
}


let post = document.getElementById('post');
let content = document.getElementById('content');
const botonpostea = document.getElementById('botonpostea');
>>>>>>> c81f1a9ad1768a2b152e630974dd54424c4dd364

// // botonpostea.addEventListener('click', () => {
// //     console.log('entra al evento')
// //     var userId = firebase.auth().currentUser.uid;
// //     // return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
// //         const newPost = writeNewPost(userId, post.value);
// //         console.log(post.value);
// //     return 'creo';
// //     reload_page()
// // });

<<<<<<< HEAD
// // function reload_page() {
// //     window.location.reload();
// // }; 
=======
const div = document.createElement('div');
function valposteos() {
>>>>>>> c81f1a9ad1768a2b152e630974dd54424c4dd364

    while (div.firstChild) div.removeChild(div.firstChild);

<<<<<<< HEAD
// console.log(valposteos());
// content.appendChild(div)
// botonpostea.addEventListener('click', () => {
//     console.log('entra al evento')
//     var userId = firebase.auth().currentUser.uid;
//     // return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
//         const newPost = writeNewPost(userId, post.value);
//         console.log(post.value);
//     return 'creo';
// });

=======
    var userId = firebase.auth().currentUser.uid;
    const promesita = firebase.database().ref('/posts').child(userId).once('value');

    const posteos = promesita.then(function (snapshot) {

        Object.keys(snapshot.val()).map(item => {

            const p = document.createElement('p');

            p.innerHTML = `
                
                    <div class="w3-container w3-card w3-white w3-round w3-margin"><br>
                    <div id='prof' class="w3-left w3-circle w3-margin-right" style="width:60px"></div>
                    <span class="w3-right w3-opacity">16 min</span>
                    <div id=${item}>${snapshot.val()[item].body}</div><br>
                    <hr class="w3-clear">
                    <button id="fb-root" data-layout="button_count" type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="far fa-thumbs-up"></i> Me Gusta</button> 
                    <button id="plusone-div" type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i>  Comentar</button> 
                    <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "eliminar()"><i class="far fa-trash-alt"></i>Elimina</button>           
                    <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "editar()"><i class="far fa-edit"></i> Editar</button>
                    </div> 
                    </div><br>`
                ;
            return div.appendChild(p)
        })
        return snapshot.val();
    });

    console.log(posteos);
}

//console.log(valposteos());
content.appendChild(div)
botonpostea.addEventListener('click', () => {
    console.log('entra al evento')
>>>>>>> c81f1a9ad1768a2b152e630974dd54424c4dd364

    var userId = firebase.auth().currentUser.uid;
    const newPost = writeNewPost(userId, post.value);

    valposteos();

/*     const p = document.createElement('p');

    p.innerHTML = content.innerHTML += `
                
                    <div class="w3-container w3-card w3-white w3-round w3-margin"><br>
                    <div id='prof' class="w3-left w3-circle w3-margin-right" style="width:60px"></div>
                    <span class="w3-right w3-opacity">16 min</span>
                    <div id=id=${newPost}>${post.value}</div><br>
                    <hr class="w3-clear">
                    <button id="fb-root" data-layout="button_count" type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="far fa-thumbs-up"></i> Me Gusta</button> 
                    <button id="plusone-div" type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i>  Comentar</button> 
                    <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "eliminar()"><i class="far fa-trash-alt"></i>Elimina</button>           
                    <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "editar()"><i class="far fa-edit"></i> Editar</button>
                    </div> 
                    </div><br>`
        ; */
return 'creo';

});