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

    display();
});

function display() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item #: " + res[i].item_id +
                "\nProduct: " + res[i].product_name +
                "\nPrice: $" + res[i].price + "\n")
        }
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstQ',
                message: 'Please enter the "Item #" you would like to purchace.'
            },
            {
                type: 'input',
                name: 'scndQ',
                message: "How many would you like to purchace?"
            }
        ])
        .then(function(ans1){
            var selection = ans1.firstQ -1;
            var howmana = ans1.scndQ;

            if (Number(res[selection].stock_quantity) < Number(howmana)) {
                console.log ("Insufficient quantity!");
                console.log("There are only " + res[selection].stock_quantity +  " " + res[selection].product_name + "'s left.")
                connection.end();
            } else {
                inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'review',
                        message: 'Would you like to review your purchace?'
                    }
                ])
                .then(function(ans2){
                    if (ans2.review === false) {
                        console.log("Okay, have a good day.");
                        connection.end();
                    } else {
                        console.log(
                            "Item: " + res[selection].product_name +
                            "\nQty: " + howmana +
                            "\nTotal: " + (howmana * res[selection].price)
                        )
                    inquirer.prompt([
                        {
                            type: 'confirm',
                            name: 'checkout',
                            message: 'Complete purchace?'
                        }
                    ])
                    .then(function(ans3){
                        if (ans3 === false) {
                            console.log("Okay, have a good day.");
                            connection.end();
                        } else {
                            connection.query("UPDATE products SET stock_quantity = stock_quantity -" + howmana + " WHERE item_id = " + ans1.firstQ);
                            console.log("Thank you for your Purchace!")
                            finalInventory();
                        
                        }
                    })
                    }
                })
            }
            })
              
            
    
        })
    

}

function finalInventory(){
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item #: " + res[i].item_id +
                "\nProduct: " + res[i].product_name +
                "\nPrice: $" + res[i].price +
                "\nQty: " + res[i].stock_quantity + "\n")
        }
    });
    connection.end();
}

