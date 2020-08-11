$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios
    .get("http://www.omdbapi.com?s=" + searchText + "&apikey=9b24b202")
    .then((response) => {
      let movies = response.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="title-details">
              <img src="${movie.Poster}">
              <div class="middle">
               
                <a onclick="movieSelected('${movie.imdbID}')" class="button" href="#">More Details</a>
              </div>
            </div>
          </div>
        `;
      });

      $("#movies").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  console.log(movieId);

  axios
    .get("http://www.omdbapi.com?i=" + movieId + "&apikey=9b24b202")
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output = `
      <section class="movie-info">
        <div class="movie-row">
        
          <div class="movie-header">
          <ul><li> ${movie.Runtime}</li>  <li> ${movie.Year}</li> <li> ${movie.Country}</li> </ul>
            <h2>${movie.Title}</h2>
            <div class="button">
            <div class="rating">
              <p>${movie.imdbRating}/10</p>
            </div>
              <a href="index.html" class="btn btn-default">Search again</a>
              </div>
          </div>
            
          <div class="information">
            <div class="list-group-item">
              <h4>Plot</h4>
              <p>  ${movie.Plot}</p>
              <br>
            </div>

            <div class="list-group">
              <div class="list-group-item">
                <h4>Cast</h4>
                <p>  ${movie.Actors}</p>
              </div>

              <div class="list-group-item">
                <h4>Genre</h4>
                <p> ${movie.Genre}</p>
              </div>

              <div class="list-group-item">
                <h4>Director</h4>
                <p> ${movie.Director}</p>
              </div>
            </div>
          </div>
        
        </div>

        <div class="movie-row">
          <div class="poster">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
        </div>
      </section>
    
      `;

      $("#movie").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
