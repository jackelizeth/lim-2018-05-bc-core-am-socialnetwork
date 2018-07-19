const btnLogout = document.getElementById('btnLogout');
const btnSignin = document.getElementById('btnSignin');
const registre = document.getElementById('registre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const logout = document.getElementById('logout');
const btnGoogle = document.getElementById('btnGoogle');
const btnFacebook = document.getElementById('btnFacebook');

const state = {
    name: null,
};

 /* crear email y password */
window.onload=()=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
             /* si el usuario esta logiado */
            console.log('inicio logueado');
            login.classList.remove("hiden");
            logout.classList.add("hiden");
            console.log(user);
            userName.innerHTML = `Bienvenida ${user.displayName}`;
            // userName.innerHTML = `Bienvenida ${state.name}`;
        } else {
            console.log('no esta logueado');
            login.classList.add("hiden");
            logout.classList.remove("hiden");
        }
      });
}

registre.addEventListener('click',()=>{
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(function(){
        // state.name = name.value;
        console.log('se creo el usuario')
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
    provider.setCustomParameters({
        'display': 'popup'
    });

    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        console.log('sesion con Google');})
    .catch(function(error) {
        console.log(error.code);
        console.log(error.message);
        console.log(error.email);
        console.log(error.credential);
      });
})


btnFacebook.addEventListener('click',()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        'display': 'popup'
    });

    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        console.log('sesion con Facebook');})
    .catch(function(error) {
        console.log(error.code);
        console.log(error.message);
        console.log(error.email);
        console.log(error.credential);
      });
})
    
