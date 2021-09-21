const converter = require('xml2json');
const fs = require('fs');
const { workPath, pakFolder, metadataFolder, dataFolder, rawFolder, languageFolder } = require('./config');
const metaDataPath = `${workPath}${pakFolder}${metadataFolder}`;
const languagePath = `${workPath}${pakFolder}${languageFolder}`;
const rawPath = __dirname + `\\..\\${dataFolder}\\${rawFolder}`

fs.mkdir(rawPath, { recursive: true }, err => {
   if (err) throw err;
});

const exmlToJson = (sourceFolder) => {
  fs.readdir(sourceFolder, (err, files) => {
    const exmlFiles = files.filter(file => file.endsWith('.EXML'));
    const getNextFile = (file) => {
      if(file){
        console.log(`reading file ${file}`);
        fs.readFile(`${sourceFolder}\\${file}`, { encoding: 'utf-8'}, (err, data) => {
          const json = converter.toJson(data);
          const jsonFilePath = `${rawPath}\\${file.substr(0, file.length - 5)}.json`;
          fs.writeFile(jsonFilePath, json, () => {
            console.log(`done writing ${jsonFilePath}`);
            getNextFile(exmlFiles.pop());
          });
        })
      }
      else{
        console.log(`Finished extracting ${exmlFiles.length - 1} files.`)
      }
    }
    getNextFile(exmlFiles.pop());
  })
}

exmlToJson(metaDataPath);
exmlToJson(languagePath);
