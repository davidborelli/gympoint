import Mail from '../../lib/Mail';

class QuestionAnsweredMail {
  get key() {
    return 'QuestionAnsweredMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;
    await Mail.sendMail({
      to: helpOrder.student.email,
      subject: `Pergunta respondida`,
      template: 'questionAnswered',
      context: {
        student: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
      },
    });
  }
}

export default new QuestionAnsweredMail();
