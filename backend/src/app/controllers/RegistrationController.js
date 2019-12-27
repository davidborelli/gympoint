import * as Yup from 'yup';
import {
  parseISO,
  isBefore,
  addMonths,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';

import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import WelcomeMail from '../jobs/WelcomeMail';

class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      student_id: Yup.number()
        .positive()
        .required(),
      plan_id: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { start_date } = req.body;
    const parsedDate = parseISO(start_date);

    // date in the past, student already registered
    const today = setSeconds(setMinutes(setHours(new Date(), 0), 0), 0);
    if (isBefore(parsedDate, today)) {
      return res.status(400).json({ error: 'You cannot enroll in past dates' });
    }

    const alreadyRegistered = await Registration.findOne({
      where: {
        student_id: req.body.student_id,
      },
    });

    if (alreadyRegistered) {
      return res
        .status(400)
        .json({ error: 'This student is already registered' });
    }

    const plan = await Plan.findByPk(req.body.plan_id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    const { price: monthPrice, duration } = plan;
    const price = monthPrice * duration;
    const end_date = addMonths(parsedDate, duration);

    const { registration } = await Registration.create({
      ...req.body,
      price,
      end_date,
    });

    const { name: studentName, email: studentEmail } = await Student.findByPk(
      req.body.student_id
    );

    await Queue.add(WelcomeMail.key, {
      studentName,
      studentEmail,
      start_date,
      end_date,
      planTitle: plan.title,
      price,
    });

    return res.json(registration);
  }

  async findById(req, res) {
    const { registrationId } = req.params;

    const registrations = await Registration.findByPk(registrationId, {
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          attributes: ['id', 'title', 'price', 'duration'],
        },
      ],
    });
    return res.json(registrations);
  }

  async index(req, res) {
    const registrations = await Registration.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          attributes: ['id', 'title', 'price', 'duration'],
        },
      ],
    });
    return res.json(registrations);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      student_id: Yup.number().positive(),
      plan_id: Yup.number().positive(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, student_id, start_date, plan_id } = req.body;

    const registrationExist = await Registration.findByPk(id);

    if (!registrationExist) {
      return res.status(400).json({ error: 'This has not exist' });
    }

    const registration = await Registration.findOne({ where: { student_id } });

    if (!registration) {
      return res.status(400).json({ error: 'This student has no enrollment' });
    }

    const today = setSeconds(setMinutes(setHours(new Date(), 0), 0), 0);
    if (start_date && start_date !== registration.start_date) {
      const parsedDate = parseISO(start_date);
      if (isBefore(parsedDate, today)) {
        return res
          .status(400)
          .json({ error: 'You cannot enroll in past dates' });
      }
    }

    if (plan_id && plan_id !== registration.plan_id) {
      const planExists = await Plan.findByPk(plan_id);
      if (!planExists) {
        return res.status(400).json({ error: 'This plan is not registered' });
      }
    }

    const plan = await Plan.findByPk(plan_id);
    const { price, duration } = plan;
    const total_price = duration * price;
    const end_date = addMonths(parseISO(start_date), duration);

    const planUpdated = await registration.update({
      ...req.body,
      price: total_price,
      end_date,
    });

    return res.json(planUpdated);
  }

  async delete(req, res) {
    const { registrationId } = req.params;
    const registration = await Registration.findByPk(registrationId);
    await registration.destroy();

    return res.json();
  }
}

export default new RegistrationController();
