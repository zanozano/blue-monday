//API
const https = require('https');

//LINEA DE COMANDOS
const argv = process.argv.slice(2);
let currecyChosen = String(argv[0]);

https
	.get('https://mindicador.cl/api', (resp) => {
		resp.on('data', (data) => {
			const currencies = JSON.parse(data);
			//Recorre el objeto
			for (const property in currencies) {
				//Condiciona al objeto para que sea igual a la eleccion del usuario
				if (property == currecyChosen) {
					console.log(currencies[property].valor);
					let currencyValue = currencies[property].valor;
					return currencyValue;
				}
			}
		});
	})
	.on('error', (error) => {
		console.log('Error: ' + error.message);
	});
