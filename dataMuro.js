const google = document.getElementById('google');
const facebook = document.getElementById('facebook');
const facebook1= document.getElementById('facebook1');
const google1 = document.getElementById('google1');
const botoncerrar=document.getElementById('botoncerrar');
const ingresa=document.getElementById('ingresa');

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

google.addEventListener('click',inGoogle);
facebook.addEventListener('click',inFacebook);
google1.addEventListener('click', inGoogle)
facebook1.addEventListener('click', inFacebook)
document.getElementById('registrar').addEventListener("click", loginEmail);
ingresa.addEventListener('click',ingresa);

let post=document.getElementById('post');
let content=document.getElementById('content');
const botonpostea=document.getElementById('botonpostea');
botonpostea.addEventListener('click',writeNewPost);
