const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const wikipedia = require('./routes/wikipedia');

var app = express();

app.use('/', express.static(path.join(__dirname, 'client', 'build')));
app.use('/explore', express.static(path.join(__dirname, 'client', 'build')));
app.use('/api/wikipedia', wikipedia);
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
