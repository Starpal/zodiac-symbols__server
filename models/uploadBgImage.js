const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadBgImageSchema = new Schema({
	filename: {
		type: String,
		unique: true,
		required: true
		},
	contentType: {
		type: String,
		required: true
	},
	imageBase64: {
		type: String,
		required: true
	}
})

uploadBgImage = mongoose.model('uploads', uploadBgImageSchema);

module.exports = uploadBgImage;