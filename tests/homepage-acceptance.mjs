import assert from 'node:assert/strict';

const base = process.env.SITE_BASE_URL || 'http://127.0.0.1:3122';
const pairs = [
  {path:'/fr', language:'fr', title:'Avocate en droit des sociétés et immobilier au Portugal', cta:'Présenter ma demande', contact:'/fr/contact', formation:'/fr/creation-entreprise-portugal', corporate:'/fr/accompagnement-juridique-societes-portugal', direct:'Vous échangez directement avec moi', status:'Avocate inscrite au Barreau de Paris et enregistrée au Barreau de Lisbonne.'},
  {path:'/', language:'en', title:'Corporate and Real Estate Lawyer in Portugal', cta:'Submit my enquiry', contact:'/contact', formation:'/business-creation-portugal', corporate:'/corporate-legal-services-portugal', direct:'You communicate directly with me', status:'Lawyer admitted to the Paris Bar and registered with the Lisbon Bar.'},
];
for (const c of pairs) {
  const response = await fetch(base+c.path);
  assert.equal(response.status,200);
  const html = await response.text();
  const visible = html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'');
  assert.ok(visible.includes(c.title));
  assert.equal([...visible.matchAll(/<h1\b/g)].length,1);
  assert.equal([...visible.matchAll(/<section\b/g)].length,6);
  assert.equal([...visible.matchAll(/<article class="article"/g)].length,3);
  assert.ok(visible.includes(c.direct));
  assert.ok(visible.includes(c.status));
  assert.match(visible,new RegExp('href="'+c.formation+'"'));
  assert.match(visible,new RegExp('href="'+c.corporate+'"'));
  const links = [...visible.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
  const ctas = links.filter(([,attrs]) => /class="button (?:primary|light)"/.test(attrs));
  assert.equal(ctas.length,3);
  for (const [,attrs,text] of ctas) {
    assert.ok(attrs.includes('href="'+c.contact+'"'));
    assert.ok(text.startsWith(c.cta));
  }
  assert.doesNotMatch(visible,/Charger Plus d'Articles|Load More Articles|Articles Juridiques|Legal Articles/);
  assert.doesNotMatch(visible,/\u2014/);
  assert.doesNotMatch(html,/double inscription|barreaux de Paris et de Lisbonne|Paris and Lisbon Bars|Lawyer at the Paris and Lisbon Bar/i);
  if (c.language==='fr') assert.ok(visible.includes('Fiscalité'));
}
const mode = await (await fetch(base+'/api/enquiry')).json();
assert.equal(mode.enabled,false);
console.log('PASS: approved bilingual homepage, six sections, three existing articles, clear company routes, matching contact CTAs, professional status and closed sending.');
