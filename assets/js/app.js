$(document).ready(() => {
	$(".button-collapse").sideNav();
  $('.modal').modal();
  $('.tooltipped').tooltip({delay: 30});
  $('ul.tabs').tabs('select_tab', 'tab_id');
  observer();
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
    var email = $('#email').val();
    var pass = $('#password').val();
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
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
    firebase.auth().signInWithEmailAndPassword(email2, pass2).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert('Correo electrónico y/o Contraseña inválidos');
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
       console.log('logeado');
       gotToProfile();
       var displayName = user.displayName;
       var email = user.email;
       var emailVerified = user.emailVerified;
       var photoURL = user.photoURL;
       var isAnonymous = user.isAnonymous;
       var uid = user.uid;
       var providerData = user.providerData;

       // ...
       } else { 
       // User is signed out.
       // ...

      }
    });
  } 

  /*
  *Firebase: Ir a el Perfil (Luego de registrarse por primera vez)
  */
  function gotToProfile() {
    window.location = ("editProfile.html");
  }

  /*
  *Firebase: Ir al bsucador (Luego de iniciar sesión)
  */
  function gotToProfile() {
    window.location = ("editProfile.html");
  }
  
  /*
  *Cambiando clases de las Tabs
  */
  $('.login-btn').click(function() {
    $('#openSignUp').removeClass('active');
    $('#openLogin').addClass('active');
    
  });

  $('.resgister-btn').click(function() {
    $('#openLogin').removeClass('active');
    $('#openSignUp').addClass('active');
  });

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

