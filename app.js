const express = require('express');
const database = require('./database');
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  var pokemonList = await database.Pokemon.find({}).sort('nationalNumber');
  //console.log(pokemonList);
  res.render('home.ejs', {pokemonList: pokemonList});
})

app.get('/newPokemon', (req, res) => {
  res.render('newPokemon.ejs');
})

app.post('/addPokemon', async (req, res) => {
  //var pokemon = new database.Pokemon();
  let {name, nationalNumber, primaryType, secondaryType} = req.body;
  let pokemon = new database.Pokemon({
    name: name,
    nationalNumber: nationalNumber,
    primaryType: primaryType,
    secondaryType: secondaryType
  });
  try {
    let result = await pokemon.save();
    res.redirect('/');
  } catch(err) {
    console.log(err);
    res.status(404).send("Error");
  }
})

app.get('/pokemon/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let query = await database.Pokemon.findById(id);
    if (! query) {
      res.status(404).send("Not found");
    }
    res.render('editPokemon.ejs', query);
  } catch (err) {
    console.log(err);
    res.status(404).send("Not found");
  }
})

app.post('/editPokemon/:id', async (req, res) => {
  let id = req.params.id;
  let { nationalNumber, name, primaryType, secondaryType } = req.body;
  let pokemon = {
    nationalNumber: nationalNumber,
    name: name,
    primaryType: primaryType,
    secondaryType: secondaryType
  };
  try {
    let query = await database.Pokemon.findByIdAndUpdate(id, pokemon);
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(404).send("Not found");
  }
})

app.post('/deletePokemon/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let result = await database.Pokemon.findByIdAndDelete(id);
    res.redirect('/');
  } catch (err) {
    res.status(404).send();
  }
})

app.listen(port, () => {
})

app.use(function(req, res, next) {
  res.status(404).send("Not found");
 });