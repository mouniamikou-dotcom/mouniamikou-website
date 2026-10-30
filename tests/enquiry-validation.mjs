import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const {validateEnquiry} = require('../src/lib/enquiry-validation.cjs');
const valid = {fullName:'Élodie Test',email:'audit@example.com',description:'Création — essai fictif',privacyAccepted:true};
for (const language of ['fr','en']) for (const service of ['formation','corporate','property','immigration','other']) {
  test(`${language}/${service}: optional answers may all be empty`,()=>{
    const result=validateEnquiry({...valid,language,service});
    assert.equal(result.ok,true);assert.deepEqual(result.data.answers,{});assert.equal(result.data.fullName,valid.fullName);
  });
}
test('server rejects missing required data and privacy',()=>{
 const result=validateEnquiry({language:'fr'});assert.equal(result.ok,false);
 assert.deepEqual(Object.keys(result.errors),['fullName','email','service','description','privacyAccepted']);
});
test('selling excludes financing and unrelated answers',()=>{
 const result=validateEnquiry({...valid,service:'property',answers:{transaction:'sell',financing:'1',ownership:'2'}});
 assert.deepEqual(result.data.answers,{transaction:'sell'});
});
test('buying permits financing but rejects fabricated options',()=>{
 assert.equal(validateEnquiry({...valid,service:'property',answers:{transaction:'buy',financing:'1'}}).data.answers.financing,'1');
 assert.equal(validateEnquiry({...valid,service:'property',answers:{transaction:'invalid'}}).ok,false);
});
test('email headers cannot contain newline injection',()=>{
 assert.equal(validateEnquiry({...valid,service:'other',email:'audit@example.com\r\nBcc:other@example.com'}).ok,false);
});
test('unknown fields and previous category answers are discarded',()=>{
 const result=validateEnquiry({...valid,service:'other',to:'other@example.com',answers:{activity:'previous'}});
 assert.equal('to' in result.data,false);assert.deepEqual(result.data.answers,{});
});
