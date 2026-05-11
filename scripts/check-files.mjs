import { access } from 'node:fs/promises';

const requiredFiles = [
  'index.html',
  'css/shared.css',
  'css/index.css',
  'js/access-system.js',
  'js/clearance-access.js',
  'js/evidence-filters.js',
  'js/asset-hydrator.js',
  'assets/index/hero/hero-video.mp4',
  'assets/index/prism/prism-logo-animation.mp4'
];

const missing = [];

for (const path of requiredFiles) {
  try {
    await access(path);
  } catch {
    missing.push(path);
  }
}

if (missing.length) {
  console.error('Missing required files:');
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log('Check passed: all required files are present.');
