const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))

app.post(function (req, res, next) {
  next();
});

app.get("/math", (req, res) => {
  var result = solveMath(req);
  res.render("pages/results", {
    answer: result
  });
});

app.get("/math_service", (req, res) => {

  res.writeHead(200, {
    "Content-Type": "application/json"
  })
  var result = solveMath(req);
  console.log(result);
  var json = JSON.stringify({
    "answer": result
  })
  console.log(`math service: ${json}`);
  res.end(json);
});

app.get("/post-rates", (req, res) => {
  var cost = calculateCost(req);
  res.render("pages/response", {
    answer: cost
  });
});


// async function () {
//   let response = await fetch('/math_service')
//   let responseJson = await response.json()
//   let fromServer = responseJson.myString
//   alert(fromServer)
// }
// app.get(fetch('/results')
//   .then(response => response.json())
//   .then(data => console.log(data));


//   componentWillMount: function(){
//     var fromServer = fetch('/results')
//     .then(function(response) {
//       return response.json()
//     })
//     .then(function(responseJson) {

//       return responseJson.myString
//     })

//     alert(fromServer);

//   },

app.listen(PORT, () => console.log(`Listening on ${PORT}`))


// if a file is in the public it just renders automatically

// operand1, operation, operand2

function solveMath(req) {
  var operand1 = req.query.operand1;
  var operand2 = req.query.operand2;
  var operation = req.query.operation;

  if (operation == "+") {
    var result = +operand1 + +operand2;

  }
  if (operation == "-") {
    var result = +operand1 - +operand2;

  }
  if (operation == "*") {
    var result = +operand1 * +operand2;

  }
  if (operation == "/") {
    var result = +operand1 / +operand2;

  }
  console.log(operation);
  console.log(operand2);
  console.log(operand1);
  console.log(result);
  // res.render('/results', () => {
  //   answer: result 
  // })
  return result;
}

function calculateCost(req) {
  var weight = req.query.weight;
  var type = req.query.type;
  var cost;


  switch (type) {
    case 'stamped':
      if (weight <= 1) {
        cost = .55;
      } else if (weight <= 2) {
        cost = .75;
      } else if (weight <= 3) {
        cost = .95;
      } else {
        cost = 1.15;
      }
      break;

    case 'metered':
      if (weight <= 1) {
        cost = .51;
      } else if (weight <= 2) {
        cost = .71;
      } else if (weight <= 3) {
        cost = .91;
      } else {
        cost = 1.11;
      }
      break;
    case 'flats':
      if (weight <= 1) {
        cost = 1.00;
      } else if (weight <= 2) {
        cost = 1.20;
      } else if (weight <= 3) {
        cost = 1.40;
      } else if (weight <= 4) {
        cost = 1.60;
      } else if (weight <= 5) {
        cost = 1.80;
      } else if (weight <= 6) {
        cost = 2.00;
      } else if (weight <= 7) {
        cost = 2.20;
      } else if (weight <= 8) {
        cost = 2.40;
      } else if (weight <= 9) {
        cost = 2.60;
      } else if (weight <= 10) {
        cost = 2.80;
      } else if (weight <= 11) {
        cost = 3.00;
      } else if (weight <= 12) {
        cost = 3.20;
      } else {
        cost = 3.40;
      }
      break;

    case 'package':
      if (weight <= 4) {
        cost = 4.00;
      } else if (5 <= weight <= 8) {
        cost = 4.80;
      } else if (9 <= weight <= 12) {
        cost = 5.50;
      } else {
        cost = 6.25;
      }
      break;
  }


  return cost;
}