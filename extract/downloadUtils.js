
const download = require('download');
const config = require('./config');
const { workFolder } = config;

function downloadUtils() {
  const files = [
    'https://github.com/periander/PSArcTool/raw/master/PSArcTool.zip',
    'https://github.com/monkeyman192/MBINCompiler/releases/download/v3.68.0-pre1/libMBIN-dotnet4.dll',
    'https://github.com/monkeyman192/MBINCompiler/releases/download/v3.68.0-pre1/MBINCompiler.exe',
    'https://github.com/monkeyman192/MBINCompiler/releases/download/v3.68.0-pre1/libMBIN.dll'
  ];

  const downloadFiles = files.map(async file => {
    return new Promise((resolve) => {
      const options = { };
      if(file.endsWith('.zip')){
        options.extract = true;
      }
      await download(file, workFolder, options);
      resolve(file);
    })
  });
  
  Promise.all(downloadFiles).then((result) => {
    console.log('completed', result);
  })
}
downloadUtils();
