module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('help_orders', {
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
      question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      answer_at: {
        type: Sequelize.TIME,
        allowNull: true,
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
    return queryInterface.dropTable('help_orders');
  },
};
