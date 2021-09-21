
const cpy = require('cpy');
const config = require('./config');
const { sourceFolder, workFolder } = config;

fs.mkdir(workFolder, { recursive: true }, err => {
  if (err) throw err;
});

const cpystate = {
  lastCompletedCount: 0
};

cpy([`${sourceFolder}GAMEDATA/PCBANKS/*.pak`, `!${sourceFolder}GAMEDATA/PCBANKS/NMSARC.5B11B94C.pak`], workFolder)
  .on('progress', progress => {
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
