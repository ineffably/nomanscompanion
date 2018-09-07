// const program = require('commander');
import { transformTable } from './app/nmsutils';
import command from 'commander';
import fs from 'fs';

function transposeTable(inFile, outFile) {
  console.log(`reading file: ${inFile}`);
  const file = fs.readFileSync(inFile);
  const languageJson = JSON.parse(file);
  const result = languageJson.Data.Property.Property.map(el => {return transformTable(el);});
  const data = { data: result };
  console.log(`writing file: ${outFile}`);
  fs.writeFileSync(outFile, JSON.stringify(data, null, 2));
}

function transposeLanguageFiles(inFile, outFile, language = 'English') {
  console.log(`reading file: ${inFile}`);
  const file = fs.readFileSync(inFile);
  const languageJson = JSON.parse(file);
  const result = languageJson.Data.Property.Property.map(el => {return transformTable(el);});
  const final = {};
  console.log('mapping table');
  result.forEach(el => {final[el.Id] = el[language];});
  const data = { data: final };
  console.log(`writing file: ${outFile}`);
  fs.writeFileSync(outFile, JSON.stringify(data, null, 2));
}

command.version('0.1')
  .option('-t, --transpose')
  .parse(process.argv);

if (command.transpose) {
  transposeTable(
    __dirname + '/data/raw/NMS_REALITY_GCPRODUCTTABLE.json',
    __dirname + '/data/raw/nms_reality_gcproducttable.transformed.json',
  );

  transposeLanguageFiles(
    __dirname + '/data/NSM_LOC1_ENGLISH.json', 
    __dirname + '/data/nms_loc1_english.transformed.json'
  );
  transposeLanguageFiles(
    __dirname + '/data/NSM_LOC4_ENGLISH.json', 
    __dirname + '/data/nms_loc4_english.transformed.json'
  );
  transposeLanguageFiles(
    __dirname + '/data/NSM_UPDATE3_ENGLISH.json', 
    __dirname + '/data/nms_update3_english.transformed.json'
  );
}
