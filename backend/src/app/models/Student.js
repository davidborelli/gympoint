import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        height: Sequelize.DECIMAL,
        weight: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Student;
