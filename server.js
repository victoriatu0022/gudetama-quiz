var express = require("express");


var app = express();
var PORT = 3000;

var exphbs = require("express-handlebars");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set up MySQL connection.
var mysql = require("mysql");

console.log('--------------the environment we are using----------------');
console.log(app.settings.env);
console.log('--------------the environment we are using----------------');

if (app.settings.env == 'development'){
  var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "quiz_db"
  });
}else {
  var connection = mysql.createConnection(process.env.JAWSDB_URL);
}

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});


// 






// for css
app.use(express.static(process.cwd() + "/public"));


// app.get("/quiz", function(req, res) {
// 	res.render("questions", { questions: quiz });
//   });
 
// app.get("/quiz", function(req, res) {
// 	  res.render("quizrender", { quiz: req.params.quiz});
// 	});
	
	app.get('/', function(req, res){
 
    var query = "SELECT * FROM scores ORDER BY score DESC";

    connection.query(query, function(err, result) {
			//res.json(result)
   	res.render('quizrender', {
        scores: result
    });
    });
});
	


	app.post('/submit', function (req, res) {
		var counter = 0;

		if (req.body.question_one == "lazy") counter++;
		if (req.body.question_two == "egg") counter++;
		if (req.body.question_three == "egg shell") counter++;
		if (req.body.question_four == "getting jiggled") counter++;
		if (req.body.question_five == "yes") counter++;
		if (req.body.question_six == "with chopsticks") counter++;
		if (req.body.question_seven == "worms") counter++;
		if (req.body.question_eight == "soy sauce") counter++;
		if (req.body.question_nine == "bacon") counter++;
		if (req.body.question_ten == "maybe") counter++;

			//res.render('quiz_score', { score : counter.toString()} )

			
			var query = "INSERT INTO scores (name, score) VALUES (?, ?)";

			connection.query(query, [req.body.name, counter], function(err, result) {
				res.redirect('/')
			})

	  });



app.listen(PORT, function() {
	// Log (server-side) when our server has started
	console.log("Server listening on: http://localhost:" + PORT);
  });


/*
	after making this file

	you do

	$ npm init -y

	$ npm install express --save

	$ node server15.js
*/



