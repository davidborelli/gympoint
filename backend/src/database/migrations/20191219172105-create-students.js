module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      height: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.TIME,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('students');
  },
};
