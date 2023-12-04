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
