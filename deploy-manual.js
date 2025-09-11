const { execSync } = require('child_process');
const path = require('path');

console.log('Building the project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully.');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

console.log('Deploying to GitHub Pages...');
try {
  execSync('npx gh-pages -d build', { stdio: 'inherit' });
  console.log('Deployment completed successfully.');
} catch (error) {
  console.error('Deployment failed:', error);
  process.exit(1);
}
