import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
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
      student_id: Yup.number().required(),
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

      if (studentExists) {
        return res
          .status(400)
          .json({ error: 'This e-mail is already registered' });
      }
    }

    const student = await Student.findByPk(req.body.student_id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await student.update(req.body);

    return res.json(student);
  }

  async index(req, res) {
    const students = await Student.findAll({
      attributes: ['name', 'email', 'age', 'weight'],
    });
    return res.json(students);
  }
}

export default new StudentController();
