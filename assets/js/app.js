$(document).ready(() => {
	/*$('#searchForm').on('submit', (e) => {
		let searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
	$('#btnLast').click(() => {
		$('#showMovies').


		http://www.omdbapi.com?i=tt2527336&apikey=d9cba372


	});*/
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