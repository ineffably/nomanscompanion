const fs = require('fs');
const { dataFolder } = require('./config');
const cookedPath = __dirname + `\\..\\${dataFolder}`;

const combineLanguages = async (readPath, filter = () => true, postTranform = data => data) => {
  const result = [];
  return new Promise((resolve, reject) => {
    fs.readdir(readPath, (err, files) => {
      console.log('files', files);
      const workingSet = files.filter(filter);
      workingSet.forEach(file => {
        const filePath = `${cookedPath}\\${file}`;
        console.log(`${cookedPath}\\${file}`);
        const fileContent = fs.readFileSync(filePath);
        console.log(fileContent.length)
        const data = JSON.parse(fileContent);
        result.push(data);
      })
      return resolve(result.reduce((combined, entry) => ([...combined, ...entry]), []));
    })
  });
}

const doLanguages = async () => {
  const langauge = '_usenglish';
  const combinedLanguages = await combineLanguages(cookedPath, file => file.endsWith(`${langauge}.json`))
  fs.writeFileSync(`${cookedPath}\\all${langauge}.json`, JSON.stringify(combinedLanguages));
}
doLanguages();

