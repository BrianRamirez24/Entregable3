const mongoose = require("mongoose");
const bcryp = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	roll:{type: String, required: true },
	estado:{type: String, required: true},
	fechaReg: {type:Date, default:Date.now}
});

//se encripta la contrasena
userSchema.methods.encryptPassword = async function(password) {
	const salt = await bcryp.genSalt(10);
	const hash = bcryp.hash(this.password, salt, (err, hash) =>{
		if(err){
			throw err
		}
		else{
			this.password = hash
		}

	});
	return hash; 
}


//metodo de login
userSchema.methods.comparePassword = async function(password) { 
	return await bcryp.compare(password, this.password)
}


module.exports = mongoose.model("user", userSchema);

