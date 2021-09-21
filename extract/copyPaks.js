const fs = require('fs');
const cpy = require('cpy');
const config = require('./config');
const { sourcePath, workPath, pakFolder } = config;

const pakFilesNames = ['NMSARC.86055253.pak', 'NMSARC.515F1D3.pak'];
const pakFiles = pakFilesNames.map(file => `${sourcePath}GAMEDATA/PCBANKS/${file}`);

fs.mkdir(workPath, { recursive: true }, err => {
  if (err) throw err;
});

const cpystate = {
  lastCompletedCount: 0
};
const pakDeskPath = `${workPath}\\${pakFolder}`;
cpy(pakFiles, pakDeskPath).on('progress', progress => {
    const { percent, completedFiles, totalFiles, completedSize } = progress;
    const { lastCompletedCount } = cpystate;
    if(completedFiles > lastCompletedCount){
      cpystate.lastCompletedCount = completedFiles;
      console.log(Math.round(percent * 100) / 100, completedSize, completedFiles, totalFiles);
    }
  })
  .then(obj => {
    console.log(`complete! ${obj}`);
  });
