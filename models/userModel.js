const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
    
	facialEmbeddings: {
		type: Array,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports.User = mongoose.model("user", userSchema);
