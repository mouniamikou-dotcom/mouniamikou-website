const questions = require('../content/enquiry-conditional.json');
const messages = require('../content/enquiry-messages.json');
const services = ['formation', 'corporate', 'property', 'immigration', 'other'];

// Pure validation shared by the future isolated notification route and its tests.
// No mail, logging or storage side effects.
function validateEnquiry(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {ok:false, errors:{request:'Invalid request'}};
  const language = input.language === 'fr' ? 'fr' : 'en';
  const copy = messages[language];
  const errors = {};
  const clean = (key, max) => typeof input[key] === 'string' ? input[key].trim().slice(0, max) : '';
  const data = {language, fullName:clean('fullName',200), email:clean('email',254), phone:clean('phone',50), service:clean('service',30), description:clean('description',5000), additionalInfo:clean('additionalInfo',3000), privacyAccepted: input.privacyAccepted === true};
  if (!data.fullName) errors.fullName = copy.name;
  if (!data.email) errors.email = copy.emailRequired;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || /[\r\n]/.test(input.email)) errors.email = copy.emailInvalid;
  if (!services.includes(data.service)) errors.service = copy.service;
  if (!data.description) errors.description = copy.description;
  if (!data.privacyAccepted) errors.privacyAccepted = copy.privacy;
  data.answers = {};
  const answers = input.answers && typeof input.answers === 'object' && !Array.isArray(input.answers) ? input.answers : {};
  for (const question of questions) {
    if (question.service !== data.service || (question.buyOnly && answers.transaction !== 'buy')) continue;
    const value = typeof answers[question.key] === 'string' ? answers[question.key].trim().slice(0,300) : '';
    if (!value) continue;
    if (question.options.length && !question.options.some(option => option.value === value)) {errors[question.key] = 'Invalid option'; continue;}
    data.answers[question.key] = value;
  }
  return Object.keys(errors).length ? {ok:false,errors} : {ok:true,data};
}
module.exports = {validateEnquiry};
