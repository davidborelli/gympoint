import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .positive()
        .required(),
      price: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const planExists = await Plan.findOne({ where: { title: req.body.title } });
    if (planExists) {
      return res.status(400).json({ error: 'This plan is already registered' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({ id, title, duration, price });
  }

  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });
    return res.json(plans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().positive(),
      price: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { planId } = req.params;
    const plan = await Plan.findByPk(planId);

    if (!plan) {
      return res.status(404).json({ error: 'This plan does not exists' });
    }

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const { planId } = req.params;
    const plan = await Plan.findByPk(planId);

    if (!plan) {
      return res.status(404).json({ error: 'This plan does not exists' });
    }

    const { title } = plan;
    await plan.destroy();

    return res.json({ message: `Plan ${title} was deleted` });
  }
}

export default new PlanController();
