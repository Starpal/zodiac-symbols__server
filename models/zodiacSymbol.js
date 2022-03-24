const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const zodiacSymbolSchema = new Schema({
	sign: String,
	degree: { type: Number, min: 01, max: 30 },
	title: String,
	keynote: String,
	description: String
},
	{
		timestamps: true
	})

ZodiacSymbol = mongoose.model('ZodiacSymbol', zodiacSymbolSchema);

module.exports = ZodiacSymbol;