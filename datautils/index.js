// const nrc = require('node-run-cmd');
const copymitter = require('copymitter');
const cpFile = require('cp-file');
const cpx = require('cpx');
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
      console.log(percent, completedSize, completedFiles, totalFiles);
    }
  })
  .then(obj => {
    console.log(`complete! ${obj}`);
  });

// downloadFiles();
getFilePaths().then(files => {

  // only pak files and excluding some large pak files
  // const pakFiles = files
  //   .filter(file => file.substr(file.length - 3) === 'pak')
  //   .filter(pakfile => !pakfile.startsWith('NMSARC.5B11B94C')) // audio files
  //   .map(file => ({file, filepath: `${sourceFolder}GAMEDATA/PCBANKS/${file}`, destpath: `${workFolder}${file}`}))
  //   .slice(0, 10); 
  // const nextFile = () => pakFiles.pop();
  // const fileCount = pakFiles.length;
  // const state = {
  //   completeCount: 0,
  //   activeFiles: 0
  // };


  const startCopyAction = () => {
    // seed 3 files in parallel
    // copyNextFile();
    // copyNextFile();
    copyNextFile();
  };

  startCopyAction();
});
