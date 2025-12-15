// Connect the necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Creating App Express
const app = express();
const PORT = 3000;

// Setting EJS (Front-End)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setting up static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Setting Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// --- ROUTES ---

/* GET request for the homepage
   It's to display the HTML page */
app.get('/', (req, res) => {
  res.render('index', {
    bmi: null,
    category: null,
    error: null
  });
});

/* POST request to calculate BMI
   Accepts data, calculates, and returns the result */
app.post('/calculate-bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (!weight || !height || weight <= 0 || height <= 0) {
    return res.render('index', {
      bmi: null,
      category: null,
      error: "Please enter valid positive numbers for weight and height."
    });
  }

  // BMI formula
  const bmi = (weight / (height * height)).toFixed(2);

  let category = '';

  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = 'Normal';
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }

  // Return the result back to the web page
  res.render('index', {
    bmi: bmi,
    category: category,
    error: null
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});