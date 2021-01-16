const mongoose = require('mongoose');
const config = require('./config');
var Schema = mongoose.Schema;

console.log(config.DATABASE_URL);
mongoose.connect(config.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected");
});

var pokemonSchema = new Schema({
  nationalNumber: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  primaryType: {
    type: String,
    required: true
  },
  secondaryType: {
    type: String,
    required: true
  }
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema, 'pokemon');

var charmander = new Pokemon({
  nationalNumber: 4,
  name: "Charmander",
  primaryType: "Fire",
  secondaryType: "None"
});
/*
var result = charmander.save().then(
  (result) => {
    console.log("Success");
    console.log(result);
  },
  (failure) => {
    console.log("Failure");
});
*/
module.exports.Pokemon = Pokemon;