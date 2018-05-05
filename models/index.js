
if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize');
  var sequelize = new Sequelize('postgres://:@localhost/photos');

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    Photo: sequelize.import(__dirname + '/photo') 
    // add your other models here
  }  
}

module.exports = global.db
