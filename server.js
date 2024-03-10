const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const csvHandler = require('./csv');

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Specify the views directory

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  try {
    const links = await csvHandler.readCSV();
    res.render('index', { links });
  } catch (error) {
    console.error('Error reading CSV file:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/links', async (req, res) => {
  try {
    const links = await csvHandler.readCSV();
    res.json(links);
  } catch (error) {
    console.error('Error reading CSV file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
