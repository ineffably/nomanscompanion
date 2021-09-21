const fs = require('fs');
const childProcess = require('child_process');
const { spawnSync } = childProcess;
const { workPath, pakFolder } = require('./config');
const psarcToolPath = `${workPath}PSArcTool.exe`
const pakPath = `${workPath}${pakFolder}`;

const doExec = (commandParams) => {
  const [command, params = null] = commandParams;
  return new Promise((resolve, reject) => {
    try{
      spawnSync(command, params, { shell: false, detached: true, windowsHide: true });
      // childCommand.stdout.on("data", data => {
      //   console.log(`stdout: ${data}`);
      // });
      // childCommand.on('exit', (code) => {
      //   console.log(`child process exited with code ${code}`);
      // })
      return resolve();
    }
    catch(e){
      reject(e)
    }
   })
}

fs.readdir(pakPath, (err, files) => {
  const pakCommands = files.filter(file => file.endsWith('.pak')).map(file => [`${psarcToolPath}`, `${pakPath}/${file}`]);
  // const pakCommands = [['dir', null]];
  const doNextCommand = () => {
    const nextCommand = pakCommands.pop();
    if(nextCommand){
      doExec([nextCommand[0], [nextCommand[1]]]).then(() => {
        doNextCommand();
      })
    }
  }
  doNextCommand();
});
