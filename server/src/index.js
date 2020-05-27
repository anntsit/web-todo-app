const express = require('express');
const path = require('path');
const Storage = require('./entityStorage');
const configureEntityController = require('./entityController');

const app = express();
const storage = new Storage('storage');
storage.configure();

app.use(express.json());

configureEntityController(app, storage);

app.use('/', express.static('public'));
app.get('*', (req,res) => {
    res.sendFile(path.join(path.dirname(__dirname), 'public/index.html'));
});

app.listen(3000, function() {
  console.log('Listening on localhost:3000...');
});
