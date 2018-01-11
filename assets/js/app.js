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

  imgsCarrousel();
  
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



  
	for (var i = 0; i < lastPremier.length; i++) {
		var moviesData = lastPremier[i];
		getMovies(moviesData);
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

function imgsCarrousel(){
	for(var i = 0; i < 8; i++) {
  		var imgsData = lastPremier[i];
  		axios.get("http://www.omdbapi.com?i=" + imgsData + '&apikey=d9cba372')
			.then(function (response) {
			var imgPosters = response.data.Poster;
			var imgTitle = response.data.Title;
			i--;
			$('#imgs' + i).append(
			'<img src="' + imgPosters + '"><h4>' + imgTitle + '</h4>'		
			);		
		});  		
 	};
};


