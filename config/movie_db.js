const request = require("request");

//Searches themovieDB for movies with the user's query
var search = (query) => {
    //@param {String} query - this is the user's search query
    // @return {Object} returns the results of the movie search (or error message if no results or an error)
    return new Promise((resolve, reject) => {
        request(
            {
                url:
                    "https://api.themoviedb.org/3/search/movie?api_key=" +
                    process.env.MOVIE_API_KEY +
                    "&query=" +
                    encodeURIComponent(query),
                json: true,
            },
            (error, res, body) => {
                if (error) {
                    reject("Cannot connect to TheMovieDB");
                } else if (body.total_results < 1) {
                    reject("No results found for query");
                } else if (typeof body.errors != "undefined") {
                    // console.log(res.body.errors[0]);
                    //set up errors for incorrect search query
                    reject("Query is empty");
                } else {
                    resolve(body.results);
                }
            }
        );
    });
};

module.exports = {
    search,
};
