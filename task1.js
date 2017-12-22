const readline = require('readline-sync');
const arrayWorker = require('./lib/array-worker');
const fileWorker = require('./lib/file-worker');
const createMenu = require('simple-terminal-menu');

let data = [];
let result;

const readAction = contents => {
	result = contents ? 'Data read' : 'Data not found';
	data = contents.split(' ').map(item => parseInt(item)) || [];
	mainMenu();
}

const writeAction = () => {
	mainMenu();
}

const menuItems = [
	{ title: 'read array from file', action: () => {
		const fileName = readline.question('Input file name for reading: ');
		fileWorker.readFile(`./data/arrays/${ fileName }`, readAction);
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
	{ title: 'get ascending array', action: () => {
		result = arrayWorker.getAscendingArray(data);
		mainMenu();
	} },
	{ title: 'get descending array', action: () => {
		result = arrayWorker.getDescendingArray(data);
		mainMenu();
	} },
	{ title: 'save result in file', action: () => {
		result = 'File seved';
		const fileName = readline.question('Input file name for saving: ');
		fileWorker.writeFile(`./data/res-arrays/${ fileName }`, result.toString(), writeAction);
	} }
]

const mainMenu = () => {
	const menu = createMenu({x:2, y:2});
	menu.writeLine("Choise action:");
	menuItems.forEach(item => menu.add(item.title, item.action));
	menu.add('exit', () => {
		menu.close();
	});
	if(result) {
		menu.writeSeparator();
		menu.writeLine('Result:', result.toString());
	}
}

mainMenu();