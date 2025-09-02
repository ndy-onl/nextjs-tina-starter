const { spawn } = require('child_process');

// Load environment variables from .env file
require('dotenv').config({ path: '.env' });

console.log('Starting TinaCMS dev server with loaded environment variables...');

// Spawn the TinaCMS dev server command
const child = spawn(
  'yarn',
  ['exec', 'tinacms', 'dev', '-c', 'next dev'],
  {
    stdio: 'inherit', // Pipe output to the parent process
    shell: true, // Use shell to properly handle commands
    env: {
      ...process.env,
      TINA_PUBLIC_IS_LOCAL: 'true', // Ensure this is set
    },
  }
);

child.on('error', (error) => {
  console.error('Failed to start subprocess.', error);
});

child.on('close', (code) => {
  console.log(`Subprocess exited with code ${code}`);
});
