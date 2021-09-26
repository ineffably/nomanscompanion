const fs = require('fs');
const { dataFolder } = require('./config');
const cookedPath = __dirname + `\\..\\${dataFolder}`;

const allLanguageFile = fs.readFileSync(`${dataFolder}\\all_usenglish.json`);
if(allLanguageFile.length > 0){
  const data = JSON.parse(allLanguageFile);
  const final = data.reduce((result, entry) => {
    const key = Object.keys(entry)[0];
    const value = entry[key];
    result[key] = value;
    return result;
  }, {})
  fs.writeFileSync(`${dataFolder}\\all_new_usenglish.json`, JSON.stringify(final));
}

