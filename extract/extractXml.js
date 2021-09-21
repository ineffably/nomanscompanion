const { execSync } = require('child_process');
const fs = require('fs');
const { workPath, pakFolder, metadataFolder, languageFolder } = require('./config');
const binCommandPath = `${workPath}MBINCompiler.exe --nolog -y -f`;
const metaDataPath = `${workPath}${pakFolder}${metadataFolder}`;
const languagePath = `${workPath}${pakFolder}${languageFolder}`;

const extractTables = (tablePath, fileFilter = () => true ) => {
  
  fs.readdir(tablePath, (err, files) => {
    const mbinFiles = files.filter(file => file.endsWith('.MBIN') && fileFilter(file));
    const extractFile = (file) => {
      const buffer = execSync(`${binCommandPath} ${tablePath}${file}`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
      console.log(buffer);
    }
    mbinFiles.forEach(extractFile);
    console.log(`Finished extracting ${mbinFiles.length - 1} files.`)
  })
}

extractTables(metaDataPath);
extractTables(languagePath, file => file.endsWith('ENGLISH.MBIN'));

