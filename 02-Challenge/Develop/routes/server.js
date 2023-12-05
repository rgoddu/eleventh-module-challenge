const express = require("express")
const path = require("path")
const PORT = 3001;
const app = express();

const fs = require('fs');

const noteData = require(`../db/db.json`)



app.get('/api/notes', (req, res) => {
  //read data from the db.json, return it in the response object
  res.send((noteData))
});

app.post('/api/notes', (req, res) => {
  //write to the db.json file

    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newReview = {
        product,
        review,
        username,
        upvotes: Math.floor(Math.random() * 100),
        review_id: uuid(),
      };
  
      const response = {
        status: 'success',
        body: newReview,
      };
  
      console.log(response);
      // res.json() returns data including a status message indicating the success of the request along with the newly created review data.
      res.status(201).json(response);
    } else {
      // the purpose of the else statement is to allow a way to throw an error if either the product, review, or username is not present.
      res.status(500).json('Error in posting review');
    }
});

app.use(express.static('../public'));

app.get('/notes', (req, res) => {
  //read data from the db.json, return it in the response object
  res.sendFile(path.join(__dirname, '../public/notes.html'))  ;
  
});
app.get('*', (req, res) => {
  //read data from the db.json, return it in the response object
  res.sendFile(path.join(__dirname, 'index.html'))  ;
  
  });

// Listen for connections
app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT}`)
);
