'use client';

import { useState, useId, useEffect, useRef } from 'react';
import { enquiryTestToken } from '@/lib/enquiry-test-token';
import { useLanguage } from '@/context/LanguageContext';
import { enquiryCopy, enquiryServices } from '@/content/enquiry';
import Link from '@/components/LocalizedLink';
import questions from '@/content/enquiry-conditional.json';
import messages from '@/content/enquiry-messages.json';

export default function EnquiryForm({ initialService = '' }) {
  const { language } = useLanguage();
  const copy = enquiryCopy[language];
  const [answers, setAnswers] = useState({});
  const [service, setService] = useState(enquiryServices.includes(initialService) ? initialService : '');
  const [notice, setNotice] = useState(false);
  const [errors, setErrors] = useState({});
  const [testMode, setTestMode] = useState(false);
  const [delivery, setDelivery] = useState('idle');
  const submitting = useRef(false);
  useEffect(() => {
    let active = true;
    fetch('/api/enquiry', {cache:'no-store'}).then(response => response.ok ? response.json() : null).then(config => {if (active) setTestMode(config?.enabled === true);}).catch(() => {});
    return () => {active = false;};
  }, []);
  const id = useId();
  const fieldClass = 'block w-full mt-2 p-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary';

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting.current || delivery === 'success') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const copyErrors = messages[language];
    const next = {};
    if (!String(data.get('fullName') || '').trim()) next.fullName = copyErrors.name;
    const email = String(data.get('email') || '').trim();
    if (!email) next.email = copyErrors.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = copyErrors.emailInvalid;
    if (!service) next.service = copyErrors.service;
    if (!String(data.get('description') || '').trim()) next.description = copyErrors.description;
    if (!data.get('privacyAccepted')) next.privacyAccepted = copyErrors.privacy;
    setErrors(next);
    setNotice(!Object.keys(next).length && !testMode);
    if (Object.keys(next).length) event.currentTarget.elements.namedItem(Object.keys(next)[0])?.focus();
    if (Object.keys(next).length || !testMode) return;
    submitting.current = true;
    setDelivery('sending');
    try {
      const recaptchaToken = await enquiryTestToken();
      const response = await fetch('/api/enquiry', {method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(20000),body:JSON.stringify({language,fullName:data.get('fullName'),email:data.get('email'),phone:data.get('phone'),service,description:data.get('description'),additionalInfo:data.get('additionalInfo'),privacyAccepted:Boolean(data.get('privacyAccepted')),answers,website:data.get('website'),recaptchaToken})});
      const result = await response.json();
      if (response.ok && result.success === true) setDelivery('success');
      else if (result.code === 'PREVIEW_DISABLED') {setNotice(true);setTestMode(false);setDelivery('idle');}
      else {setDelivery('failure');if(result.errors)setErrors(result.errors);}
    } catch {setDelivery('failure');}
    finally {submitting.current = false;}
  }

  return <section className="bg-gray-50 pt-28 pb-16 sm:pt-36 px-5 sm:px-8" id="enquiry">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">{copy.title}</h1>
      <form noValidate onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
        <div aria-hidden="true" className="hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        {testMode && <p className="rounded-lg bg-amber-50 p-4">{language === 'fr' ? 'Recette de préproduction : utiliser uniquement les données fictives convenues.' : 'Preview acceptance test: use only the agreed fictitious test data.'}</p>}
        {Object.keys(errors).length > 0 && <div role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4"><ul>{Object.entries(errors).map(([key, message]) => <li key={key}><a href={'#'+id+'-'+({fullName:'name', privacyAccepted:'privacy'}[key] || key)} className="underline">{message}</a></li>)}</ul></div>}
        <div><label htmlFor={id+'-name'} className="font-medium">{copy.name}</label><input id={id+'-name'} name="fullName" aria-invalid={Boolean(errors.fullName)} autoComplete="name" placeholder={copy.namePlaceholder} required maxLength={200} className={fieldClass} /></div>
        <div><label htmlFor={id+'-email'} className="font-medium">{copy.email}</label><input id={id+'-email'} name="email" aria-invalid={Boolean(errors.email)} type="email" autoComplete="email" placeholder={copy.emailPlaceholder} required maxLength={254} className={fieldClass} /></div>
        <div><label htmlFor={id+'-phone'} className="font-medium">{copy.phone}</label><input id={id+'-phone'} name="phone" type="tel" autoComplete="tel" placeholder="+351 ..." maxLength={50} className={fieldClass} /></div>
        <div><label htmlFor={id+'-service'} className="font-medium">{copy.subject}</label><select id={id+'-service'} name="service" aria-invalid={Boolean(errors.service)} value={service} onChange={event => {setService(event.target.value); setAnswers({}); setNotice(false);}} required className={fieldClass}>
          <option value="">{copy.select}</option>{enquiryServices.map((value, index) => <option key={value} value={value}>{copy.services[index]}</option>)}
        </select></div>
        {questions.filter(question => question.service === service && (!question.buyOnly || answers.transaction === 'buy')).map(question => <div key={question.key}>
          <label htmlFor={id+'-'+question.key} className="font-medium">{question[language]} <span className="text-sm text-gray-500">({language === 'fr' ? 'facultatif' : 'optional'})</span></label>
          {question.options.length ? <select id={id+'-'+question.key} name={question.key} value={answers[question.key] || ''} className={fieldClass} onChange={event => setAnswers(current => {
            const next = {...current, [question.key]: event.target.value};
            if (question.key === 'transaction' && event.target.value !== 'buy') delete next.financing;
            return next;
          })}><option value="">{language === 'fr' ? 'Sélectionner (facultatif)' : 'Select (optional)'}</option>{question.options.map(option => <option key={option.value} value={option.value}>{option[language]}</option>)}</select> : <input id={id+'-'+question.key} name={question.key} maxLength={300} value={answers[question.key] || ''} onChange={event => setAnswers(current => ({...current, [question.key]: event.target.value}))} className={fieldClass} />}
        </div>)}
        <div><label htmlFor={id+'-description'} className="font-medium">{copy.description}</label><textarea id={id+'-description'} name="description" aria-invalid={Boolean(errors.description)} placeholder={copy.descriptionPlaceholder} required maxLength={5000} rows={6} className={fieldClass} /></div>
        <div><label htmlFor={id+'-additional'} className="font-medium">{copy.additional}</label><textarea id={id+'-additional'} name="additionalInfo" placeholder={copy.additionalPlaceholder} maxLength={3000} rows={3} className={fieldClass} /></div>
        <p className="text-sm text-gray-600">{copy.purpose}</p>
        <label className="flex items-start gap-3"><input id={id+'-privacy'} type="checkbox" name="privacyAccepted" aria-invalid={Boolean(errors.privacyAccepted)} required className="mt-1 h-5 w-5 shrink-0 accent-teal-700" /><span>{copy.privacy}</span></label>
        <p><Link href="/privacy" className="text-primary-dark underline underline-offset-4">{copy.policy}</Link></p>
        <button type="submit" disabled={delivery === 'sending' || delivery === 'success'} aria-busy={delivery === 'sending'} className="rounded-lg bg-primary-dark px-6 py-3 font-semibold text-white hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{delivery === 'sending' ? messages[language].sending : copy.submit}</button>
        {delivery === 'success' && <p role="status" className="rounded-lg bg-green-50 p-4">{messages[language].success}</p>}
        {delivery === 'failure' && <p role="alert" className="rounded-lg bg-red-50 p-4">{messages[language].failure}</p>}
        {notice && <p role="status" className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-gray-800">{copy.preview}</p>}
      </form>
    </div>
  </section>;
}
