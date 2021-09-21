// const nrc = require('node-run-cmd');

const cpy = require('cpy');
const download = require('download');
const fs = require('fs');
const config = {
  workFolder: 'c:/temp/nms/',
  sourceFolder: 'c:/games/steam/steamapps/common/No Man\'s Sky/'
};
const { workFolder, sourceFolder } = config;

fs.mkdir(workFolder, { recursive: true }, err => {
  if (err) throw err;
});

function readDir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (error, files) => {
      error ? reject(error) : resolve(files);
    });
  });
}

function downloadFiles() {
  download(
    'https://gbatemp.net/download/psarc-extractor.25178/download?version=25178',
    workFolder,
    { extract: true }
  );
  download(
    'https://github.com/monkeyman192/MBINCompiler/releases/download/v2.24.0-pre2/MBINCompiler.exe',
    workFolder
  );
  download(
    'https://github.com/monkeyman192/MBINCompiler/releases/download/v2.24.0-pre2/libMBIN.dll',
    workFolder
  );
}

function getFilePaths() {
  return new Promise((resolve, reject) => {
    readDir(`${sourceFolder}GAMEDATA/PCBANKS/`).then(files => {
      resolve(files);
    });
  });
}

const cpystate = {
  lastCompletedCount: 0
};

cpy([`${sourceFolder}GAMEDATA/PCBANKS/*.pak`, `!${sourceFolder}GAMEDATA/PCBANKS/NMSARC.5B11B94C.pak`], workFolder)
  .on('progress', progress => {
    const { percent, completedFiles, totalFiles, completedSize } = progress;
    const { lastCompletedCount } = cpystate;
    if(completedFiles > lastCompletedCount){
      cpystate.lastCompletedCount = completedFiles;
      console.log(`${Math.round(percent * 100)}% ${completedFiles}/${totalFiles} ${completedSize} bytes`);
    }
  })
  .then(obj => {
    console.log('Complete!');
  });


