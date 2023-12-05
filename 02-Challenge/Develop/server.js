const express = require("express")
const path = require("path")
const PORT = process.env.port || 3001;
const app = express();

const uuid = require('./uuid')

const fs = require('fs');

const noteData = require(`./db/db.json`)


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
  //read data from the db.json, return it in the response object
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  //read data from the db.json, return it in the response object
  res.json(noteData)
});

app.post('/api/notes', (req, res) => {
  //write to the db.json file
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;
  if (title && text) {
    const newReview = {
      title,
      text,
      id: uuid()
    };


    noteData.push(newReview);
    fs.writeFile(
      './db/db.json',
      JSON.stringify(noteData, null, 4),
      (writeErr) =>
        writeErr
          ? console.error(writeErr)
          : console.info('Successfully updated db!')
    );


    const response = {
      status: 'success',
      body: newReview,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));

});

// Listen for connections
app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT}`)
);
