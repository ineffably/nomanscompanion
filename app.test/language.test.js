import { transformTable } from '../app/nmsutils';
// const fetch = require('node-fetch');

let languageJson = {};

describe('Transform Language', () => {
  beforeAll(async () => {
    // const response = await fetch('../data/NSM_LOC1_ENGLISH.json');
    // const json = await response.json();
    // console.log('json', json);
    // languageJson = json;
  });

  it('converts name and value to object', () => {
    const result = transformTable(languageJson);
    console.log(result);
  });
});