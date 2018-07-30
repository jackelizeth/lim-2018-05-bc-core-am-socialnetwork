const btnLogout = document.getElementById('btnLogout');

const baseDatos = document.getElementById('base-de-datos');
const btnToPost = document.getElementById('btnToPost');
const textAreaPost = document.getElementById('textAreaPost');
const miPost = document.getElementById('miPost');

const state = {
    name: null,
};

/* crear email y password */
window.onload = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {/* si el usuario esta logiado */
            console.log('inicio logueado');
            // login.classList.remove("hiden");
            // logout.classList.add("hiden");
            // baseDatos.classList.remove("hiden");
            miPost.classList.remove("hiden");
            console.log(state);
            console.log(user);

            userName.innerHTML = `Bienvenida ${user.displayName} estamos a tu servicio`;
            // userName.innerHTML = `Bienvenida ${state.name}`;

        } else { // si no estas logueado ingresa a index
            // assign = asignar
            window.location.assign("index.html");
            // baseDatos.classList.add("hiden");
            miPost.classList.add("hiden");
        }
    });
}

/* cerrar sesion */
btnLogout.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        console.log('Cerro Sesión');
        login.classList.remove("hiden");
        logout.classList.add("hiden");
    }).catch(function (error) {
        console.log('Error al cerrar Sesión');
    });
})

// document.write('mi perfill')

// se crea una publicación y esta se actualiza de manera simultanea
function writeNewPost(uid, username, body) {
    // A post entry.
    var postData = {
        author: username,
        uid: uid,
        body: body,
    };

    // Obtiene una clave para un nuevo post
    var newPostKey = firebase.database().ref().child('posts').push().key;
    // Escribe los datos de la nueva publicación simultáneamente en la lista de publicaciones y en la lista de publicaciones del usuario.
    var updates = {};
    //Data de todos los post y cada post tiene su usuario
    updates['/posts/' + newPostKey] = postData;
    //Data de post por cada usuario 
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    firebase.database().ref().update(updates);

    return newPostKey;
}

btnToPost.addEventListener('click', () => {
    // conectando con usuario
    let userId = firebase.auth().currentUser.uid;
    const newPost = writeNewPost(userId, textAreaPost.value);

    const btnUpdate = document.createElement("input");
    //setAttribte agrega un elemento y le da un valor especificado
    btnUpdate.setAttribute("value", "Actualizar");
    btnUpdate.setAttribute("type", "button");
    const btnDelete = document.createElement("input");
    btnDelete.setAttribute("value", "Eliminar");
    btnDelete.setAttribute("type", "button");
    const contPost = document.createElement('div');
    const textPost = document.createElement('textarea')
    textPost.setAttribute("id", newPost);

    textPost.innerHTML = textAreaPost.value;
    // btnDelete.addEventListener('click', () => {

    //     // BASE DE DATOS
    //     firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
    //     // verifica que id es de ese post
    //     firebase.database().ref().child('posts/' + newPost).remove();

    //     //DOM
    //     while (posts.firstChild) posts.removeChild(posts.firstChild);

    //     alert('The user is deleted successfully!');
    //     // para no volver a cargar
    //     reload_page();

    // });
    // btnUpdate.addEventListener('click', () => {
    //     const newUpdate = document.getElementById(newPost);
    //     const nuevoPost = {
    //       body: newUpdate.value,
    //     };
    //     let updatesUser = {};
    //     let updatesPost = {};
    //     updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
    //     updatesPost['/posts/' + newPost ] = nuevoPost;
    //     firebase.database().ref().update(updatesUser);
    //     firebase.database().ref().update(updatesPost);
    //   });
    
      contPost.appendChild(textPost);
    //   contPost.appendChild(btnUpdate );
    //   contPost.appendChild(btnDelete);
      posts.appendChild(contPost);
    })
