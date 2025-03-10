/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: ____ShuTing Hsu_____ Student ID: _133505222_____ Date: ___Jan,19,2025_____
*  Vercel/Render Link: ___________https://moviesapi-2hyg.onrender.com______________
*
********************************************************************************/ 


const express = require('express'); // Import the Express framework
const cors = require('cors'); // Import the CORS middleware
const MoviesDB = require("./modules/moviesDB.js"); // Import the MoviesDB module
require('dotenv').config(); // Enable dotenv to read from the .env file

const app = express(); // Create an instance of the Express application
const HTTP_PORT = process.env.PORT || 3000; // Use HTTP_PORT from .env or default to 3000
const db = new MoviesDB(); // Create a new instance of the MoviesDB

app.use(cors()); // Use CORS middleware to allow cross-origin requests
app.use(express.json()); // Middleware to parse JSON requests

// Define a GET route for the root URL "/"
app.get('/', (req, res) => {
    res.json({ message: "API Listening" }); // Send a JSON response
});

// Initialize the database and start the server only on success
db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);

        // POST /api/movies: Add a new movie
        app.post('/api/movies', (req, res) => {
            db.addNewMovie(req.body)
                .then(movie => res.status(201).json(movie)) // 201 Created
                .catch(err => res.status(500).json({ error: "Failed to add movie", message: err.message })); // 500 Internal Server Error
        });

        // GET /api/movies: Get all movies with optional pagination and title filter
        app.get('/api/movies', (req, res) => {
            const { page, perPage, title } = req.query;
            db.getAllMovies(page, perPage, title)
                .then(movies => res.json(movies)) // 200 OK
                .catch(err => res.status(500).json({ error: "Failed to retrieve movies", message: err.message })); // 500 Internal Server Error
        });

        // GET /api/movies/:id: Get a specific movie by ID
        app.get('/api/movies/:id', (req, res) => {
            const { id } = req.params;
            db.getMovieById(id)
                .then(movie => {
                    if (movie) res.json(movie); // 200 OK
                    else res.status(404).json({ error: "Movie not found" }); // 404 Not Found
                })
                .catch(err => res.status(500).json({ error: "Failed to retrieve movie", message: err.message })); // 500 Internal Server Error
        });

        // PUT /api/movies/:id: Update a movie by ID
        app.put('/api/movies/:id', (req, res) => {
            const { id } = req.params;
            db.updateMovieById(req.body, id)
                .then(result => {
                    if (result.modifiedCount > 0) res.status(204).send(); // 204 No Content
                    else res.status(404).json({ error: "Movie not found or no changes made" }); // 404 Not Found or No Changes
                })
                .catch(err => res.status(500).json({ error: "Failed to update movie", message: err.message })); // 500 Internal Server Error
        });

        // DELETE /api/movies/:id: Delete a movie by ID
        app.delete('/api/movies/:id', (req, res) => {
            const { id } = req.params;
            db.deleteMovieById(id)
                .then(result => {
                    if (result.deletedCount > 0) res.status(204).send(); // 204 No Content
                    else res.status(404).json({ error: "Movie not found" }); // 404 Not Found
                })
                .catch(err => res.status(500).json({ error: "Failed to delete movie2", message: err.message })); // 500 Internal Server Error
        });

    });
}).catch((err)=>{
    console.log(err);
});





