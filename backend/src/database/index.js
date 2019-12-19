import Sequelize from 'sequelize';

import User from '../app/models/User';
import Checkin from '../app/models/Checkin';
import HelpOrder from '../app/models/HelpOrder';
import Plan from '../app/models/Plan';
import Registration from '../app/models/Registration';
import Student from '../app/models/Student';

import dataBaseConfig from '../config/database';

const models = [User, Checkin, HelpOrder, Plan, Registration, Student];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
