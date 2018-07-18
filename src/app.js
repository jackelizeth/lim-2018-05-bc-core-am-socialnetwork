const btnLogout = document.getElementById('btnLogout');
const btnSignin = document.getElementById('btnSignin');
const registre = document.getElementById('registre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const logout = document.getElementById('logout');
const btnGoogle = document.getElementById('btnGoogle');

 /* crear email y password */
window.onload=()=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
             /* si el usuario esta logiado */
            login.classList.remove("hiden");
            logout.classList.add("hiden");
            console.log('inicio logueado')
        } else {
            login.classList.add("hiden");
            logout.classList.remove("hiden");
            console.log('no esta logueado')
        }
      });
}

registre.addEventListener('click',()=>{
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(function(){
        console.log('se agreo el usuario')
    })
    .catch(function(error) {
        console.log(error.code, error.message)
        // var errorCode = error.code;
        // var errorMessage = error.message;
    });  
});

btnSignin.addEventListener('click',()=>{
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(function(){
        console.log('inicia sesion')
    })
    .catch(function(error) {
        console.log(error.code, error.message)
    });
})

btnLogout.addEventListener('click',()=>{
    firebase.auth().signOut().then(function() {
        console.log('Cerro Sesión');
        login.classList.remove("hiden");
        logout.classList.add("hiden");
      }).catch(function(error) {
        console.log('Error al cerrar Sesión');
      });
})

/* si te logueas con google obtienes toda la data  */
btnGoogle.addEventListener('click',()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log('sesion con Google');
      }).catch(function(error) {
       
        console.log(error.code);
        console.log(error.message);
        console.log(error.email);
        console.log(error.credential);
  
      });
})


    
