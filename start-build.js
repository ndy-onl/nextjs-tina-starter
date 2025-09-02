// start-build.js
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting TinaCMS build...');

const nodeBinPath = path.resolve(__dirname, 'node_modules', '.bin');
const newPath = `${nodeBinPath}:${process.env.PATH}`;

const child = spawn(
  './node_modules/.bin/tinacms',
  ['build', '--', '&&', 'next', 'build'],
  {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      PATH: newPath,
    },
  }
);

child.on('error', (error) => {
  console.error('Failed to start build process.', error);
});

child.on('close', (code) => {
  console.log(`Build process exited with code ${code}`);
});
