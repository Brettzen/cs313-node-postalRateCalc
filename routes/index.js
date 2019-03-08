var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Postal Rate Calculator' });
});

/* POST calculate page. */
router.post('/calculate', function(req, res) {
	var item = getItemName(Number(req.body.item));
	var price = getPrice(Number(req.body.weight), Number(req.body.item));

	var data = {
		title: "Postal Rate Calculator",
		weight: req.body.weight,
		item: item,
		price: price.toFixed(2)
	};

	console.log(data);

	if (req.body.weight > 13) {
		res.render('tooBig', data);
	} else {
		res.render('prices', data);
	}

	

	
});

module.exports = router;

function getItemName(item) {
	switch(item) {
		case 1:
			return "Stamped Letter";
			break;
		case 2: 
    		return "Metered Letter";
    		break;
    	case 3:
    		return "Large Envelope";
    		break;
    	case 4:
    		return "First-Class Package";
    		break;
	}
}

function getPrice(weight, item) {
	switch(item){
		case 1:
			return stampedPrice(weight);
			break;
		case 2:
			return meteredPrice(weight);
			break;
		case 3:
			return envelopePrice(weight);
			break;
		case 4:
			return packagePrice(weight);
			break;
	}
}

function stampedPrice(weight) {
	if (weight <= 3.5) {
		return (Math.ceil(weight) * .15) + .40;
	} else {
		return envelopePrice(weight);
	}
}

function meteredPrice(weight) {
	if (weight <= 3.5){
		return (Math.ceil(weight) * .15) + .35;
	} else {
		return envelopePrice(weight);
	}
}

function envelopePrice(weight) {
	if (weight <= 13) {
		return (Math.ceil(weight) * .15) + .85;
	} else {
		return 2.80;
	}
}

function packagePrice(weight) {
	if (weight <= 4) {
		return 3.66;
	} else if (weight <= 8) {
		return 4.39;
	} else if (weight <= 12) {
		return 5.19;
	} else {
		return 5.71;
	}
}