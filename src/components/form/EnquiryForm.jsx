'use client';

import { useState, useId } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { enquiryCopy, enquiryServices } from '@/content/enquiry';
import Link from '@/components/LocalizedLink';
import { translations } from '@/translations';

export default function EnquiryForm({ initialService = '' }) {
  const { language } = useLanguage();
  const copy = enquiryCopy[language];
  const transaction = translations[language].realEstateForm.transactionType;
  const [service, setService] = useState(enquiryServices.includes(initialService) ? initialService : '');
  const [notice, setNotice] = useState(false);
  const id = useId();
  const fieldClass = 'block w-full mt-2 p-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary';

  function handleSubmit(event) {
    event.preventDefault();
    // No network request, reCAPTCHA call, storage, or personal-data logging in preview.
    setNotice(true);
  }

  return <section className="bg-gray-50 pt-28 pb-16 sm:pt-36 px-5 sm:px-8" id="enquiry">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">{copy.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
        <div><label htmlFor={id+'-name'} className="font-medium">{copy.name}</label><input id={id+'-name'} name="fullName" autoComplete="name" placeholder={copy.namePlaceholder} required maxLength={200} className={fieldClass} /></div>
        <div><label htmlFor={id+'-email'} className="font-medium">{copy.email}</label><input id={id+'-email'} name="email" type="email" autoComplete="email" placeholder={copy.emailPlaceholder} required maxLength={254} className={fieldClass} /></div>
        <div><label htmlFor={id+'-phone'} className="font-medium">{copy.phone}</label><input id={id+'-phone'} name="phone" type="tel" autoComplete="tel" placeholder="+351 ..." maxLength={50} className={fieldClass} /></div>
        <div><label htmlFor={id+'-service'} className="font-medium">{copy.subject}</label><select id={id+'-service'} name="service" value={service} onChange={event => {setService(event.target.value); setNotice(false);}} required className={fieldClass}>
          <option value="">{copy.select}</option>{enquiryServices.map((value, index) => <option key={value} value={value}>{copy.services[index]}</option>)}
        </select></div>
        {service === 'property' && <fieldset className="rounded-lg bg-gray-50 p-4"><legend className="font-medium">{transaction.title}</legend>
          <div className="flex flex-wrap gap-6">{['buy', 'sell'].map(value => <label key={value} className="flex items-center gap-2"><input type="radio" name="transaction" value={value} />{transaction[value]}</label>)}</div>
        </fieldset>}
        <div><label htmlFor={id+'-description'} className="font-medium">{copy.description}</label><textarea id={id+'-description'} name="description" placeholder={copy.descriptionPlaceholder} required maxLength={5000} rows={6} aria-describedby={id+'-caution'} className={fieldClass} /></div>
        <div><label htmlFor={id+'-additional'} className="font-medium">{copy.additional}</label><textarea id={id+'-additional'} name="additionalInfo" placeholder={copy.additionalPlaceholder} maxLength={3000} rows={3} className={fieldClass} /></div>
        <p id={id+'-caution'} className="text-sm text-gray-600">{copy.caution}</p>
        <label className="flex items-start gap-3"><input type="checkbox" name="privacyAccepted" required className="mt-1 h-5 w-5 shrink-0 accent-teal-700" /><span>{copy.privacy}</span></label>
        <p><Link href="/privacy" className="text-primary-dark underline underline-offset-4">{copy.policy}</Link></p>
        <button type="submit" className="rounded-lg bg-primary-dark px-6 py-3 font-semibold text-white hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{copy.submit}</button>
        {notice && <p role="status" className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-gray-800">{copy.preview}</p>}
      </form>
    </div>
  </section>;
}
