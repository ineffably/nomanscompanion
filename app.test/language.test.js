import { transformTable } from '../app/nmsutils';
import fs from 'fs';

let languageJson = {};

describe('Transform Language', () => {
  beforeAll(() => {
    const file = fs.readFileSync(__dirname + '/../data/NSM_LOC1_ENGLISH.json');
    languageJson = JSON.parse(file);
  });

  it('converts name and value to object', () => {
    expect(languageJson.Data).toBeDefined();
    expect(languageJson.Data.Property).toBeDefined();
    expect(languageJson.Data.Property.Property).toBeDefined();
    const language = 'English';
    const result = languageJson.Data.Property.Property.map(el => {return transformTable(el);});
    const final = {};
    result.forEach(el => {final[el.Id] = el[language];});
    // const data = { data: final };
    // fs.writeFileSync(__dirname + '/../data/nms_loc1_english.transformed.json', JSON.stringify(data));
    expect(final.SCAN_NO_TECH).toEqual('No scan technology installed');
  });
});