import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const {addArticleLinks}=createRequire(import.meta.url)('../src/sanity/lib/article-links.cjs');
const block=text=>({_type:'block',_key:'a',children:[{_type:'span',text,marks:['strong']}],markDefs:[]});
test('IFICI references and contact get links without changing text or source data',()=>{
 const texts=['Statut des avantages fiscaux (EBF), article 58.º-A.','Code de l’IRS (CIRS), article 81.','Administration fiscale portugaise, FAQ sur l’IFICI.','Instruction administrative n.º 20278/2025.','Instruction administrative n.º 20276/2025.','Vous souhaitez vérifier votre éligibilité à l’IFICI ? Contactez le cabinet pour une analyse de votre situation.'];
 const post={body:{fr:texts.map(block),en:[block('Personal Income Tax Code (CIRS), Article 81.')]}};
 const original=JSON.stringify(post);const result=addArticleLinks(post,'ifici-portugal-2026');
 assert.equal(JSON.stringify(post),original);assert.deepEqual(result.body.fr.map(b=>b.children[0].text),texts);
 assert.equal(result.body.fr.filter(b=>b.markDefs.length===1).length,6);
 assert.equal(result.body.fr[5].markDefs[0].href,'/contact');
 assert.ok(result.body.fr[3].markDefs[0].href.includes('instrucoes_administrativas/'));
 assert.equal(result.body.en[0].markDefs.length,1);
});
test('unrelated articles and existing links are preserved',()=>{
 const post={body:{fr:[{...block('Tax Benefits Statute (EBF), Article 58.º-A.'),markDefs:[{_key:'existing',_type:'link',href:'https://example.com'}]}]}};
 assert.equal(addArticleLinks(post,'another-slug'),post);
 assert.deepEqual(addArticleLinks(post,'ifici-portugal-2026').body.fr,post.body.fr);
});
