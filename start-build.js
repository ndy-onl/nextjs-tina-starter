// start-build.js
const { spawn } = require('child_process');

console.log('Starting TinaCMS build...');

const child = spawn(
  'yarn',
  ['exec', 'tinacms', 'build', '--', '&&', 'next', 'build'],
  {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
    },
  }
);

child.on('error', (error) => {
  console.error('Failed to start build process.', error);
});

child.on('close', (code) => {
  console.log(`Build process exited with code ${code}`);
});
