const { exec, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const magicks = require('imagemagick-convert');
const { convert } = magicks;

const { imageFolder, icondataFolder, workPath, pakFolder } = require('./config');
const fullIconPath = `${workPath}${pakFolder}${icondataFolder}`;
const targetImagePath = `${__dirname}\\${imageFolder}\\`;

const flattened = [];
function readFolderTree(path) {
  const allFiles = fs.readdirSync(path, { withFileTypes: true });
  const ddsFiles = allFiles.filter(file => file.isFile() && file.name.endsWith('.DDS')).map(file => file.name);
  const folderNames = allFiles.filter(file => !file.isFile()).map(file => ({ name: file.name }));
  const folder = {
    path,
    ddsFiles,
    children: []
  };
  flattened.push({ ...folder, ...{ children: folderNames.length } })
  folderNames.forEach(({ name }) => {
    const folderPath = `${path}${name}\\`;
    folder.children = readFolderTree(folderPath);
  });
  return folder;
}

readFolderTree(fullIconPath);

flattened.forEach(contents => {
  const { path, ddsFiles } = contents;
  const ddsFileNames = [...ddsFiles];
  const relativeIconPath = path.replace(fullIconPath, '').toLocaleLowerCase();
  const targetFolder = `${__dirname.replace('\\extract', '')}\\${imageFolder}\\${relativeIconPath}`;
  fs.mkdirSync(targetFolder, { recursive: true });
  // console.log('path', path);
  const convertFile = async (ddsFileName) => {
    if(!ddsFileName) return;
    const fullDdsPath = `${path}${ddsFileName}`; //.replace(/\\/g,'/');
    const pngname = ddsFileName.replace('.DDS', '.png').toLocaleLowerCase();
    const fullpngPath = `${targetFolder}${pngname}`;
    try{
      if(fs.statSync(fullpngPath)){
        console.log('== file exists', fullpngPath);
        return await convertFile(ddsFileNames.pop());
      }
    }
    catch(syncError) {
      try{
        const command = `magick ${fullDdsPath} ${fullpngPath}`;
        console.log(`== runnning ${command}`);
        const stdout = execSync(command, {'encoding': 'UTF-8'});
        console.log(stdout);
        return convertFile(ddsFileNames.pop());
      }
      catch(innerError){
        console.error(innerError);
      }
    }
  }
  convertFile(ddsFileNames.pop());
})