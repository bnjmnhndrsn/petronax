const express = require('express')
const app = express()
const db = require('./models')

app.get('/', (req, res) => {
    db.Photo.findOrCreate({where: {page_url: 'www.example.com'}}).spread((photo) => {
        res.send('Photo ' + photo.page_url);
    });
});

db.sequelize.sync().then(function() {
    app.listen(3000, () => console.log('Example app listening on port 3000!'))
});
