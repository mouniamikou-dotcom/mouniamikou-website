'use client';

import { useId, useRef, useState } from 'react';

export default function EditorialSteps({ steps }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef([]);

  function onKeyDown(event, index) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % steps.length;
    else if (event.key === 'ArrowLeft') next = (index + steps.length - 1) % steps.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = steps.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return <div className="space-y-6">
    <div role="tablist" className="flex flex-wrap gap-3" aria-label={steps.map(step => step.title).join(' / ')}>
      {steps.map((step, index) => <button key={index} ref={node => { tabs.current[index] = node; }} role="tab" id={id+'-tab-'+index} aria-selected={index === active} aria-controls={id+'-panel-'+index} tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => onKeyDown(event, index)} className={'rounded-lg border px-4 py-3 text-left font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary '+(active === index ? 'bg-primary-dark text-white border-primary-dark' : 'bg-white text-gray-800 border-gray-300')}>
        {step.title}
      </button>)}
    </div>
    {steps.map((step, index) => <div key={index} role="tabpanel" id={id+'-panel-'+index} aria-labelledby={id+'-tab-'+index} hidden={active !== index} tabIndex={0} className="rounded-xl border border-gray-200 bg-white p-5 sm:p-8 space-y-4">{step.content}</div>)}
  </div>;
}
