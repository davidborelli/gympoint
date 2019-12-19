module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('students', 'weight', {
      type: Sequelize.DECIMAL,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('students', 'weight');
  },
};
