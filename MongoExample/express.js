const express = require('express');
const cors = require ("cors");
const model = require('./model');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const Players = model.Players;

app.get('/players', function (require, response) {
    Players.find().then((players) => {
        response.json(players);
    });
});
app.post('/players', function (require, response) {
    console.log('Parsed request body:', require.body);

    //check if every field is filled
    if (!require.body.name || !require.body.position || !require.body.dorsal) {
        response.status(400).json({ 
            error: "Missing fields: name, position, and dorsal are required." 
        });
        return;
    }

    let newPlayer = new Players({
        name: require.body.name,
        position: require.body.position,
        dorsal: require.body.dorsal
    });

    newPlayer.save().then(() => {
            response.status(201).send("Player Created");
        })
        .catch((error) => {
            response.status(500).send( "Error creating player");
        });

});

app.listen(8080, function () {
    console.log("Server is reading on http://localhost:8080");
});
