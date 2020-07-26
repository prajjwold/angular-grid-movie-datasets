const express = require("express");
const fs = require("fs");
const papa = require('papaparse');

const app = express();
const port = process.env.PORT || 3200;
const fileUrl = './assets/IMDB-Movie-Data.csv';


const headerColumns = [
    'rank',
    'title',
    'genre',
    'description',
    'director',
    'actors',
    'year',
    'runtimeMinutes',
    'rating',
    'votes',
    'revenueMillions',
    'metaScore'
];

app.get('/api/movies', function (req, res) {
    fs.readFile(fileUrl, 'utf-8', (err, data) => {
        if (err) { throw err; }
        var data;
        papa.parse(
            data,
            {
                keepEmptyRows: false,
                complete: (result) => data = result.data
            }
        );

        var movies = getMovies(data);
        res.status(200).send(JSON.stringify(movies));
    });
})

function getMovies(csvData) {
    movies = new Array();
    for (let i = 1; i < csvData.length; i++) {
        let row = csvData[i];
        let movie = {};
        var allFieldsEmpty = true;
        for (let j = 0; j < headerColumns.length; j++) {
            if (row[j].length > 0) {
                allFieldsEmpty = false;
            }
            movie[headerColumns[j]] = row[j]
        }
        if (!allFieldsEmpty)
            movies.push(movie);
    }
    return movies;
}

var server = app.listen(port, () => {
    var host = server.address().address
    var port = server.address().port
    console.log("App listening at http://%s:%s", host, port)
});
