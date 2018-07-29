const btnLogin = document.getElementById('btnLogin');
const btnGoogle = document.getElementById('btnGoogle');
const btnFacebook = document.getElementById('btnFacebook');

const email = document.getElementById('email');
const password = document.getElementById('password');

const btnRegister = document.getElementById('btnRegister');

// const btnLogout = document.getElementById('btnLogout');

const email_create = document.getElementById('email_create');
const password_create = document.getElementById('password_create');
const apellido = document.getElementById('apellido');
const date = document.getElementById('date');
const userName = document.getElementById('userName');
// const login = document.getElementById('login');
// const muro = document.getElementById('muro');

// const baseDatos = document.getElementById('baseDatos');
// const btnSave = document.getElementById('btnSave');
// const texAreaPost = document.getElementById('texAreaPost');
// const miPosts = document.getElementById('miPosts');


const state = {
    name: null,
};

 /* valida si hay session activa o abierto*/
window.onload=()=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
             /* si el usuario esta logueado / activo / sesion abierta*/
            console.log('inicio logueado');

            //muro.classList.remove("ocultar");elimina clase hiden // mostrando el muro
            //login.classList.add("ocultar");agrega clase hiden //ocultando el login

            // baseDatos.classList.remove("hiden");
            // miPosts.classList.remove("hiden");
            console.log(user);
             // assign = asignar
            window.location.assign("muro.html");
            // userName.innerHTML = `Bienvenida ${user.displayName}`;
            // userName.innerHTML = `Bienvenida ${state.name}`;
        } else {
            console.log('no esta logueado');
           // muro.classList.add("ocultar");agrega la clase hiden del div id muro // ocultando el muro
            //login.classList.remove("ocultar");elimina clase hiden al div id login // mostrando el login
            // baseDatos.classList.add("hiden");
            // miPosts.classList.add("hiden");
        }
      });
}


/* inicia sesion con tu correo y tu password, que fue creado en el registro */
btnLogin.addEventListener('click',()=>{
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(function(){
        console.log('se creo el usuario')
    })
    .catch(function(error) {
        console.log(error.code, error.message)
    });
})

// Guardando datos en la referencia users para mostrar en la base de datos de firebase
function writeUserData(userId, name, email, imageUrl){
    firebase.database().ref('users/' + userId).set({
        name: name,
        email: email,
        picture: imageUrl,
    });
}

/* creando una cuenta desde el registro nuevo */
btnRegister.addEventListener('click',()=>{
    firebase.auth().createUserWithEmailAndPassword(email_create.value, password_create.value)
    .then(function(result){
        // state.name = name.value;
        console.log('se inicio usuario')
       const user= result.user;
        writeUserData(user.uid, user.displayName,user.email, user.photoURL);
    })
    .catch(function(error) {
        console.log(error.code, error.message)
        // var errorCode = error.code;
        // var errorMessage = error.message;
    });  
});

/* si te logueas con google obtienes toda la data  */
btnGoogle.addEventListener('click',()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        'display': 'popup'
    });

    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        console.log('sesion con Google');

        const user = result.user;
        writeUserData(user.uid, user.displayName,user.email, user.photoURL);
    })
    .catch(function(error) {
        console.log(error.code);
        console.log(error.message);
        console.log(error.email);
        console.log(error.credential);
      });
})

/*  logueada con facebook   */
btnFacebook.addEventListener('click',()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        'display': 'popup'
    });

    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        console.log('sesion con Facebook');
        const user= result.user;
        // writeUserData(user.uid, user.displayName,user.email, user.photoURL);
    })
    .catch(function(error) {
        console.log(error.code);
        console.log(error.message);
        console.log(error.email);
        console.log(error.credential);
      });
})

