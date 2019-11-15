const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address:{ type: String, required: true},
  address2:{ type: String, required: true},
  city:{ type: String, required: true},
  state:{ type: String, required: true},
  university:{ type: String, required: true},
  course:{ type: String, required: true},
  ano:{ type: String, required: true},
  arquivo:{ type: String, required: true},
  date: { type: Date, default: Date.now }
});

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
