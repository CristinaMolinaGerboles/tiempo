const mongoose = require('mongoose');

mongoose.connect ('mongodb+srv://ddavidd:zy9vem9vn5faad7N@cluster0.adnm1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' ,{
    dbName: 'volleyball',
});

const Players = mongoose.model('players', {
    name: {
        type: String
    },
    position: {
        type: String
    },
    dorsal: {
        type: Number
    },
});

module.exports = {
    Players
};