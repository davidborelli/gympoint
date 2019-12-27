import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async findById(req, res) {
    const { studentId } = req.params;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(400).json({ error: 'This student does not exists ' });
    }

    return res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .positive()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res
        .status(400)
        .json({ error: 'This e-mail is already registered' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().positive(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (req.body.email) {
      const studentExists = await Student.findOne({
        where: { email: req.body.email },
      });

      if (studentExists && studentExists.id !== req.body.id) {
        return res
          .status(400)
          .json({ error: 'This e-mail is already registered' });
      }
    }

    const student = await Student.findByPk(req.body.id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await student.update(req.body);

    return res.json(student);
  }

  async index(req, res) {
    const { q } = req.query;
    const where = {};

    if (q) {
      where.name = {
        [Op.like]: `%${q}%`,
      };
    }

    const students = await Student.findAll({
      where: where || null,
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
    });

    return res.json(students);
  }

  async delete(req, res) {
    const { studentId } = req.params;
    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ error: 'This student does not exists' });
    }

    const { name } = student;
    await student.destroy();

    return res.json({ message: `Student ${name} was deleted` });
  }
}

export default new StudentController();
