module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('checkins', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: { model: 'students', key: 'id' },
        onUpdate: 'CASCADE',
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
    return queryInterface.dropTable('checkins');
  },
};
