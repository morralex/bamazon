require("dotenv").config();

var mysql = require('mysql')

// var bPW = require('./keys');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.bamazon_pw,
    database: "bamazon"
});

  var inquirer = require('inquirer');
// --------------------------------Make the connection------------------------
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
            console.log("Item #: " + res[i].item_id +
                "\nProduct: " + res[i].product_name +
            "\nPrice: $" + res[i].price + "\n")
        }
    
    })

    connection.end();
    // start();
});

// function start() {
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'firstQ',
//             message: 'Please enter the "item_id" you would like to purchace.'
//         }
//     ])
//       .then(function(reponse1) {

       
//         }
//       )
// };
  
  


// connection.end();
