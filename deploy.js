const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting deployment process...');

// Check if build directory exists and remove it
const buildDir = path.join(__dirname, 'build');
if (fs.existsSync(buildDir)) {
  console.log('Removing existing build directory...');
  fs.rmSync(buildDir, { recursive: true, force: true });
}

console.log('Building the project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully.');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

// Check if gh-pages is installed
try {
  execSync('npx gh-pages --version', { stdio: 'pipe' });
} catch (error) {
  console.log('Installing gh-pages...');
  execSync('npm install', { stdio: 'inherit' });
}

console.log('Deploying to GitHub Pages...');
try {
  execSync('npx gh-pages -d build', { stdio: 'inherit' });
  console.log('Deployment completed successfully.');
  console.log('Your site should be available at: https://BEREKOUTOU.github.io/BankApp/');
} catch (error) {
  console.error('Deployment failed:', error);
  process.exit(1);
}
