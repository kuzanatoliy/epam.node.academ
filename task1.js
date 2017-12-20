const fs = require('fs');
const readline = require('readline-sync');
const arrayWorker = require('./lib/array-worker');
const createMenu = require('simple-terminal-menu');

let data = [];
let result;

const menuItems = [
	{ title: 'read array from file', action: () => {
		const fileName = readline.question('Input file name for reading: ');
		fs.readFile(`./data/arrays/${ fileName }`, 'utf8', (err, contents) => {
			result = "File read";
			if(err) {
				result = 'File not found';
			}
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
		const fileName = readline.question('Input file name for saving: ');
		fs.writeFile(`./data/res-arrays/${ fileName }`, result.toString(), error => {
			mainMenu();
		});
	} }
]

const mainMenu = () => {
	const menu = createMenu({x:2, y:2});
	console.log('bla');
	menu.writeLine("Choise action:");
	menuItems.forEach(item => menu.add(item.title, item.action));
	menu.add('exit', () => {
		menu.close();
		read.close();
	});
	if(result) {
		menu.writeSeparator();
		menu.writeLine('Result:', result.toString());
	}
}

mainMenu();