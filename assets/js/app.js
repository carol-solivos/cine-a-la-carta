$(document).ready(() => {
  $(".button-collapse").sideNav();
  $('.modal').modal();
  $('.tooltipped').tooltip({delay: 30});
  $('.carousel.carousel-slider').carousel({fullWidth: true});
  $('.carousel').carousel({
        dist: -50,
        padding: 100,
  });

  //codigos para filtrar
  imgsCarrousel();
  filteredMovies(9);
  $('#filtrarFilms').click(function (){
    var genre = $('#select-genre option:selected').text();
    var premier = $('#select-premier option:selected').text();
    var place = $('#select-place option:selected').text();
    filmFiltered(genre, premier, place);
  });  
  
  /*
  *Firebase: Registrar Usuario
  */ 
  $('#signup').click(function() {
    var email1 = $('#email').val();
    var pass = $('#password').val();
    firebase.auth().createUserWithEmailAndPassword(email1, pass).catch(function(error) {
     // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert('Debe ingresar un texto válido');
    // ...
    });
  });

  /*
  *Firebase: Iniciar Sesión Usuario
  */ 
  $('#login').click(function() {
    var email2 = $('#email2').val();
    var pass2 = $('#password2').val();
    console.log('logeo hermanoh');
    firebase.auth().signInWithEmailAndPassword(email2, pass2).then(function(e) {
      goToFinder();
    }).catch(function(error) {
    //firebase.auth().signInWithEmailAndPassword(email2, pass2).then(function(){
    //}).catch(function(error) {  
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert('Correo electrónico y/o contraseña inválidos');
    // ...
    });
  });

  /*
  *Firebase: Observador
  */
  function observer() {
    firebase.auth().onAuthStateChanged(function(user) {
       if (user) {
       // User is signed in.
       var displayName = user.displayName;
       var email = user.email;
       var emailVerified = user.emailVerified;
       var photoURL = user.photoURL;
       var isAnonymous = user.isAnonymous;
       var uid = user.uid;
       var providerData = user.providerData;
       console.log(user);

       /*$('#pic-top').append(
      '<img class="responsive-img circle profilepic right" src="' +
       + photoURL + '.jpg">');*/
       // ...
       } else { 
       // User is signed out.
       // ...
      }
    });
  }
  observer();

  $('#logout-btn').click(function(e) {
    e.preventDefault();
    firebase.auth().signOut()
    .then(function(){
      goToHome();
    })
    .catch(function(error) {
    })
  });

  /*
  *Firebase: Ir a el Perfil (Luego de registrarse por primera vez)
  */
  function goToProfile() {
    window.location = "editProfile.html";
    $('#mail').append('<label for="email">' +
      email + '</label>');
  }

  /*
  *Firebase: Ir a el Buscador (Luego de iniciar sesión)
  */
  function goToFinder() {
    window.location = "finder.html";
  }

  /*
  *Firebase: cerrar sesión, ir al home
  */

  function goToHome() {
    window.location = "index.html";
  }

});



function getMovies(moviesData){
	axios.get("http://www.omdbapi.com?i=" + moviesData + '&apikey=d9cba372')
	/*$('#showMovies').append()*/
	.then(function (response) {
		var imgPosters = response.data.Poster;
		var imgTitle = response.data.Title;
		var imgRatings = response.data.imdbRating;
		if (imgRatings == 'N/A') {
			imgRatings = 'Sin calificación aún';
		}
		var imgPlot = response.data.Plot;
		$('#showMovies').append('<img src="' + imgPosters + '" alt="">'
			+ '<h1>' + imgTitle + '</h1>'
			+ '<h4>' + imgRatings + '</h4>'
			+ '<p>' + imgPlot + '</p>');
	})
	.catch(function (error) {
		console.log(error);
	})
};

// peliculas filtradas
function filmFiltered(genre, premier, place) {
  $('#filteredMovies').html('');
  if (premier === 'Estrenos') {    
    var arrayData = Object.keys(lastPremier);
    for(var i = 0; i < arrayData.length; i++) {
      var imgsData = Object.keys(lastPremier)[i];
      if (lastPremier[imgsData][0].Estreno === true){
        axios.get("http://www.omdbapi.com?i=" + imgsData + '&apikey=d9cba372')
        .then(function (response) {
          var imgPosters = response.data.Poster;
          var imgTitle = response.data.Title;
          $('#filteredMovies').append(
            '<div class="filteredImages" id="imgFilter">'
            + '<img src="' + imgPosters + '" alt="">'
            + '<h6>' + imgTitle + '</h6>'
            + '</div>'
            );      
        });
      } else {continue};
    };
  } else if (genre === 'Drama') { 
    filteredMovies(8)
  } else if (place === 'La Reina') {
    filteredMovies(7)
  } else {filteredMovies(10)}
  
};


// Imagenes carrusel
function imgsCarrousel(){
	for(var i = 0; i < 8; i++) {
    var imgsData = Object.keys(lastPremier)[i];
    if (lastPremier[imgsData][0].Estreno === true){
      axios.get("http://www.omdbapi.com?i=" + imgsData + '&apikey=d9cba372')
      .then(function (response) {
        var imgPosters = response.data.Poster;
        var imgTitle = response.data.Title;
        i--;
        $('#imgs' + i).append(
          '<img src="' + imgPosters + '"><h4>' + imgTitle + '</h4>'   
          );    
      });
    } else {continue};
  };
};

// Peliculas filtradas
function filteredMovies(number){ 
  for(var i = 0; i < number; i++) {    
    var imgsData = Object.keys(lastPremier)[i];     
    axios.get('http://www.omdbapi.com?i=' + imgsData + '&apikey=d9cba372')
    .then(function (response) {
      var imgPosters1 = response.data.Poster;
      var imgTitle1 = response.data.Title;    
      $('#filteredMovies').append(
        '<div class="filteredImages" id="imgFilter">'
        + '<img src="' + imgPosters1 + '" alt="">'
        + '<h6>' + imgTitle1 + '</h6>'
        + '</div>'
        );      
    });  
  };
};

