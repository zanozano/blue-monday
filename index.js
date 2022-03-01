const child_process = require('child_process');
const fs = require('fs');

//CHILD PROCESS FUCTION
function exchange(file, currecyChosen) {
	return new Promise((resolve) => {
		child_process.exec(`node ${file} ${currecyChosen}`, function (err, result) {
			resolve(result);
		});
	});
}

//COMMAND LINE
const argv = process.argv.slice(2);
//
let fileName = String(argv[0]);
let fileExtension = String(argv[1]);
let currecyChosen = String(argv[2]);
let moneyAmount = Number(argv[3]);

//EXCHANGE VALUES
let currencyValue = null;
let currencyExchange = null;

//CURRENCY FORMAT TO USD
const formatCurrencyUsd = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0,
});

//CURRENCY FORMAT TO CLP
const formatCurrencyClp = new Intl.NumberFormat('es-CL', {
	currency: 'CLP',
	style: 'currency',
});

//CALLING API FROM EXCHANGE.JS
exchange('exchange.js', currecyChosen)
	.then((getValueApi) => {
		//CURRENCY VALUE GOT FROM API
		currencyValue = getValueApi;
		currencyExchange = parseFloat(moneyAmount) / parseFloat(currencyValue);
		//USD FORMAT
		currencyExchange = formatCurrencyUsd.format(currencyExchange);
		//CLP FORMAT
		moneyAmount = formatCurrencyClp.format(moneyAmount);
		//FS MODULE
		fs.writeFile(
			`${fileName}${fileExtension}`,
			`A la fecha: ${new Date()} 
        Fue realizada una cotización con los siguientes datos: 
        Cantidad de CLP a convertir: ${moneyAmount}
        Convertido a ${currecyChosen} da un total de: ${currencyExchange}`,
			'utf8',
			() => {
				console.log('El archivo fue creado con exito');
			}
		);
		console.log(`El monto ${moneyAmount} a cambiar a ${currecyChosen} es ${currencyExchange}`);
	})
	.catch(function (error) {
		console.error(error.message);
	});
