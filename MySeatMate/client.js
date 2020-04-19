const express = require('express');
const app = express();
const readline = require('readline-sync');
const request = require('request');

console.log("Welche Funktion möchten Sie ausführen?");
console.log("Sucheingabe1: von");
// console.log("Sucheingabe2: nach");
let eingabe = readline.question("Eingabe: ");

/* if (eingabe == "Sucheingabe1") {
    request({
		url: 'http://localhost:3001/users',
		json: true
	}, function(error, response, body) {
	    console.log(body);

	});

} */
var cocklink = 'http://localhost:3001/suche';

if (eingabe == "Sucheingabe1") {
    let von = readline.question("von: ");
    let nach = readline.question("nach: ");


    var start = cocklink.concat("/", von);
    var ziel = start.concat("/", nach)
    request({
		url: ziel,
		json: true
	}, function(error, response, body) {
	    console.log(body);
    });

}

app.listen(8080);

