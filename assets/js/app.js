$(document).ready(() => {
	$(".button-collapse").sideNav();
  $('.modal').modal();
  $('.tooltipped').tooltip({delay: 30});
  $('ul.tabs').tabs('select_tab', 'tab_id');
  $('.carousel.carousel-slider').carousel({fullWidth: true});
  $('.carousel').carousel({
        dist: -50,
        padding: 100,
  });
  imgsCarrousel();
  
  


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
