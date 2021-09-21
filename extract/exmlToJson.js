const converter = require('xml-js');
const fs = require('fs');
const { workPath, pakFolder, metadataFolder, dataFolder, rawFolder } = require('./config');
const metaDataFolder = `${workPath}${pakFolder}${metadataFolder}`;
const rawPath = __dirname + `\\..\\${dataFolder}\\${rawFolder}`

fs.mkdir(rawPath, { recursive: true }, err => {
   if (err) throw err;
});

fs.readdir(metaDataFolder, (err, files) => {
  const exmlFiles = files.filter(file => file.endsWith('.EXML'));
  const getNextFile = (file) => {
    console.log(file);
    if(file){
      fs.readFile(`${metaDataFolder}\\${file}`, { encoding: 'utf-8'}, (err, data) => {
        const json = converter.xml2json(data);
        const jsonFilePath = `${rawPath}\\${file.substr(0, file.length - 5)}.json`;
        fs.writeFile(jsonFilePath, json, () => {
          getNextFile(exmlFiles.pop());
        });
      })
    }
  }
  getNextFile(exmlFiles.pop());
  console.log(`Finished extracting ${exmlFiles.length - 1} files.`)
})
