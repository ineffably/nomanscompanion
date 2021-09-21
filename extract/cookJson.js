const fs = require('fs');
const { dataFolder, rawFolder } = require('./config');
const { transformTable } = require('../nmsutils');
const rawPath = __dirname + `\\..\\${dataFolder}\\${rawFolder}`;
const cookedPath = __dirname + `\\..\\${dataFolder}`;

const transformDataTable = (json) => {
  const root = json.Data.Property.Property;
  if(root){
    const result = root.map(el => { return transformTable(el); });
    return result;
  }
  console.log('root node not found');
  return json;
}

function minimizeLanguage(json) {
  return json.map(entry => {
    const { USEnglish, Id } = entry;
    return {
      Id, 
      Value: USEnglish
    }
  })
}


const transformJson = (readPath, filter = () => true, postTranform = data => data) => {
  fs.readdir(readPath, (err, files) => {
    const workingSet = files.filter(filter);
    workingSet.forEach(file => {
      const filePath = `${rawPath}\\${file}`;
      const writePath = `${cookedPath}\\${file.toLocaleLowerCase()}`
      console.log(`${rawPath}\\${file}`);
      const fileContent = fs.readFileSync(filePath);
      console.log(fileContent.length)
      const data = JSON.parse(fileContent);
      const transformedData = transformDataTable(data);
      const final = postTranform(transformedData);
      fs.writeFileSync(writePath, JSON.stringify(final, null, 2));
    })
  })
}

transformJson(rawPath, file => file.endsWith('USENGLISH.json'), minimizeLanguage);

