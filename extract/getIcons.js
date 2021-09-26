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

flattened.filter(entry => entry.path.includes('FRONTEND\\ICONS\\MISSIONS')).forEach(contents => {
  const { path, ddsFiles } = contents;
  const ddsFileNames = [...ddsFiles];
  const relativeIconPath = path.replace(fullIconPath, '').toLocaleLowerCase();
  const targetFolder = `${__dirname.replace('\\extract', '')}\\${imageFolder}\\${relativeIconPath}`;
  console.log(path);
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

        const del_cmd = `del ${fullpngPath}`;
        console.log(`== runnning ${del_cmd}`);
        const del_cmd_stdout = execSync(del_cmd, {'encoding': 'UTF-8'});
        console.log(del_cmd_stdout);

        // const cwebp_cmd = `cwebp -q 80 ${fullpngPath} -o ${targetFolder}${pngname.replace('.png','.webp')}`;
        // console.log(`== runnning ${cwebp_cmd}`);
        // const cwebp_stdout = execSync(cwebp_cmd, {'encoding': 'UTF-8'});
        // console.log(cwebp_stdout);

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
        return await convertFile(ddsFileNames.pop());
      }
    }
  }
  convertFile(ddsFileNames.pop());
})