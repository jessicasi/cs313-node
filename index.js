const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))

// I added this to create a page for the assignment
// .get('/math', (req, res) => res.render('pages/teamwork'))
// app.get('/math', (req, res) => {
//   solveMath(req, (answer) => {
//     res.render('pages/results', {
//       answer: result
//     })
//   }
//   )
// })

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
})


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