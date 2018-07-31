document.getElementById('botoncerrar').addEventListener("click", cerrar);
function cerrar() {
    firebase.auth().signOut()
        .then(function result() {
            console.log('saliendo...')
            window.location.href = 'index.html'
            $('#root').show();
        });
} 
firebase.initializeApp({
    apiKey: "AIzaSyAd-_QsITc2hsVEPLgnB2TSVLe2xkfT8fs",
    authDomain: "nuestra-red-social.firebaseapp.com",
    projectId: "nuestra-red-social"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

function guardar() {

    let post = document.getElementById('post').value;
    db.collection("users").add({
        first: post,
        
    
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("post").value = '';
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

}   

// leer datos
let content = document.getElementById('content');
db.collection("users").onSnapshot((querySnapshot) => {
    console.log(querySnapshot)
    content.innerHTML = '';
    querySnapshot.forEach((doc) => {
        content.innerHTML +=`
           <div id=${doc.id}></div>  
                <div class="w3-container w3-card w3-white w3-round w3-margin"><br>
                <img src="imagenes/perfil.png" class="w3-left w3-circle w3-margin-right" style="width:60px" onclick="document.getElementById('modal01').style.display='block'">
                <div id="modal01" class="w3-modal w3-animate-zoom" onclick="this.style.display='none'">
                          <img class="w3-modal-content" style="width:30%;margin-left:450px" style="margin:40px" src="imagenes/perfil.png">
                      </div>
                <span class="w3-right w3-opacity">16 min</span>
                <h4>Andrea Ybañez</h4><br>
                <div>${doc.data().first}</div>
                <hr class="w3-clear">
                <button id="fb-root" data-layout="button_count" type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i> Me Gusta</button> 
                <button id="plusone-div" type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i> Comentar</button> 
                <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "eliminar('${doc.id}')"><i class="fa fa-close"></i> Elimina</button>           
                <button class="w3-button w3-theme-d1 w3-margin-bottom" onclick = "editar('${doc.id}','${doc.data().first}')"><i class="fa fa-pencil"></i> Editar</button>
                </div> 
                </div><br>`
    });
});

// borrar datos

function eliminar(id){
    db.collection("users").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}



//editar
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


function myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-theme-d1";
    } else { 
        x.className = x.className.replace("w3-show", "");
        x.previousElementSibling.className = 
        x.previousElementSibling.className.replace(" w3-theme-d1", "");
    }
}


