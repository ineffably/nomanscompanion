const { execSync } = require('child_process');
const fs = require('fs');
const { workPath, pakFolder, metadataFolder } = require('./config');
const extractXmlPath = `${workPath}MBINCompiler.exe --nolog -y -f`;
const metaDataFolder = `${workPath}${pakFolder}${metadataFolder}`;

fs.readdir(metaDataFolder, (err, files) => {
  const mbinFiles = files.filter(file => file.endsWith('.MBIN'));
  const extractFile = (file) => {
    const buffer = execSync(`${extractXmlPath} ${metaDataFolder}${file}`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
    console.log(buffer);
  }
  mbinFiles.forEach(extractFile);
  console.log(`Finished extracting ${mbinFiles.length - 1} files.`)
})
