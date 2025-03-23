// Script untuk menjalankan semua test halaman alternatif
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Warna untuk output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

console.log(`${colors.bright}${colors.magenta}=== MENJALANKAN TEST UNTUK WEBSITE INFORTIX ===${colors.reset}\n`);

// Daftar file test yang akan dijalankan
const testFiles = [
  'src/__tests__/components/layout/navigation-bar.test.tsx',
  'src/__tests__/app/beranda-page.test.tsx',
  'src/__tests__/app/kompetisi-page.test.tsx'
];

// Fungsi untuk menjalankan test
function runTest(testFile) {
  const testName = path.basename(testFile, '.test.tsx');
  console.log(`${colors.bright}${colors.blue}Menjalankan test untuk: ${testName}${colors.reset}`);
  
  try {
    // Jalankan test dengan Jest
    const output = execSync(`npx jest ${testFile} --colors`, { encoding: 'utf8' });
    console.log(output);
    console.log(`${colors.bright}${colors.green}✓ Test ${testName} berhasil!${colors.reset}\n`);
    return true;
  } catch (error) {
    console.error(`${colors.bright}${colors.red}✗ Test ${testName} gagal!${colors.reset}`);
    console.error(error.stdout);
    return false;
  }
}

// Jalankan semua test
let allTestsPassed = true;
let passedCount = 0;

for (const testFile of testFiles) {
  const passed = runTest(testFile);
  if (passed) {
    passedCount++;
  } else {
    allTestsPassed = false;
  }
}

// Tampilkan ringkasan hasil
console.log(`${colors.bright}${colors.magenta}=== RINGKASAN HASIL TEST ===${colors.reset}`);
console.log(`${colors.bright}Total test files: ${testFiles.length}${colors.reset}`);
console.log(`${colors.bright}${colors.green}Test berhasil: ${passedCount}${colors.reset}`);

if (!allTestsPassed) {
  console.log(`${colors.bright}${colors.red}Test gagal: ${testFiles.length - passedCount}${colors.reset}`);
  process.exit(1);
} else {
  console.log(`${colors.bright}${colors.green}Semua test berhasil!${colors.reset}`);
  process.exit(0);
}
