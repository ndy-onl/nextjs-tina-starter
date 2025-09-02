const { spawn } = require('child_process');
const path = require('path');

console.log('Starting TinaCMS dev server...');

const nodeBinPath = path.resolve(__dirname, 'node_modules', '.bin');
const newPath = `${nodeBinPath}:${process.env.PATH}`;

const child = spawn(
  './node_modules/.bin/tinacms',
  ['dev', '--', '-c', 'next dev'],
  {
    stdio: 'inherit', // Pipe output to the parent process
    shell: true, // Use shell to properly handle commands
    env: {
      ...process.env,
      PATH: newPath, // Explicitly set PATH
    },
  }
);

child.on('error', (error) => {
  console.error('Failed to start subprocess.', error);
});

child.on('close', (code) => {
  console.log(`Subprocess exited with code ${code}`);
});
