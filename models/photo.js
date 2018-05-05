module.exports = (sequelize, DataTypes) => {
  return sequelize.define('photo', {
    page_url: DataTypes.STRING,
  })
}
