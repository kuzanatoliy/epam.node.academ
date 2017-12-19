const fs = require('fs');
const readline = require('readline');
const arrayWorker = require('./lib/array-worker');
const createMenu = require('simple-terminal-menu');

let data = [1, -1, 2, -2, 3, -3, 4, -4];
let result;

const menuItems = [
	{ title: 'read array from file', action: () => {
		fs.readFile('./data/arrays/test1.txt', 'utf8', (err, contents) => {
			result = "File read";
			data = contents.split(' ').map(item => parseInt(item));
			mainMenu();
		});
	} },
	{ title: 'find max element in array', action: () => {
		result = arrayWorker.getMaxOfArray(data);
		mainMenu();
	} },
	{ title: 'find min element in array', action: () => {
		result = arrayWorker.getMinOfArray(data);
		mainMenu();
	} },
	{ title: 'get positive elements', action: () => {
		result = arrayWorker.getPositiveItems(data);
		mainMenu();
	} },
	{ title: 'get negative element', action: () => {
		result = arrayWorker.getNegativeItems(data);
		mainMenu();
	} },
	{ title: 'save result in file', action: () => {
		result = 'File seved';
		fs.writeFile('./data/res-arrays/result.txt', result.toString(), error => {
			mainMenu();
		});
		mainMenu();
	} }
]

const mainMenu = () => {
	const menu = createMenu({x:2, y:2});
	console.log('bla');
	menu.writeLine("Choise action:");
	menuItems.forEach(item => menu.add(item.title, item.action));
	menu.add('exit', menu.close);
	if(result) {
		menu.writeSeparator();
		menu.writeLine('Result:', result.toString());
	}
}

mainMenu();