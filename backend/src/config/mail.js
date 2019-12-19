export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe GYM POINT <noreply@gympoint.com>',
  },
};

/* *
 * Serviços de e-mail
 * Amazon SES
 * Sparkpost
 * Mailgun
 * Sparkpost
 * Mandril (Mailchimp)
 * Gmail (bad)
 * Mailtrap (Dev)
 * */
