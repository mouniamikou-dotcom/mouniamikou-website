import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const {editorialFetchOptions} = require('../src/sanity/policy.cjs');
test('preview and local requests cannot retain stale Studio publications',()=>{
 for(const environment of ['preview','development',undefined]) assert.deepEqual(editorialFetchOptions(environment),{cache:'no-store'});
});
test('production cache behavior stays unchanged',()=>assert.deepEqual(editorialFetchOptions('production'),{next:{revalidate:3600}}));
