const btnLogout = document.getElementById('btnLogout');

const state = {
    name: null,
};

/* crear email y password */
 window.onload=()=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {/* si el usuario esta logiado */
             console.log('inicio logueado');

            // login.classList.remove("hiden");
            // logout.classList.add("hiden");
            // baseDatos.classList.remove("hiden");
            // miPosts.classList.remove("hiden");
            console.log(state);
            console.log(user);

            // userName.innerHTML = `Bienvenida ${user.displayName}`;
            // userName.innerHTML = `Bienvenida ${state.name}`;

        } else { // si no estas logueado ingresa a index
            // assign = asignar
            window.location.assign("index.html");
            // baseDatos.classList.add("hiden");
            // miPosts.classList.add("hiden");
        }
      });
}

 /* cerrar sesion */
 btnLogout.addEventListener('click',()=>{
    firebase.auth().signOut().then(function() {
        console.log('Cerro Sesión');
        login.classList.remove("hiden");
        logout.classList.add("hiden");
      }).catch(function(error) {
        console.log('Error al cerrar Sesión');
      });
})

document.write('mi perfill')
