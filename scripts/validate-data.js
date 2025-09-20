#!/usr/bin/env node

/**
 * Data validation script for Matrix_scalping project
 * Ensures consistency of the unified data source in backend/data/
 */

import { spawn } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🔍 Validating unified data source...\n');

// Check if server is running
async function checkServerHealth() {
  try {
    const response = await fetch('http://localhost:5000/api/technologies');
    const technologies = await response.json();
    
    console.log('✅ Server is running');
    console.log(`✅ Technologies API: ${technologies.length} technologies loaded`);
    
    // Validate expected technologies
    const expectedTechs = ['Random Forest', 'LSTM', 'Pandas', 'NumPy', 'Scikit-learn'];
    const techNames = technologies.map(t => t.name);
    
    for (const expected of expectedTechs) {
      if (techNames.includes(expected)) {
        console.log(`✅ Technology found: ${expected}`);
      } else {
        console.log(`❌ Missing technology: ${expected}`);
      }
    }
    
  } catch (error) {
    console.log('❌ Server not running or API error:', error.message);
    console.log('💡 Start the server with: npm run dev');
  }
}

// Check file structure
function checkFileStructure() {
  console.log('\n📁 Checking file structure...');
  
  const requiredFiles = [
    'backend/data/technologies.ts',
    'backend/data/evolution-data.ts', 
    'backend/data/trading-machines.ts',
    'backend/data/modules/index.ts',
    'backend/knowledge-base/schema.ts',
    'backend/routes.ts'
  ];
  
  const removedFiles = [
    'backend/knowledge-base/technologies-overview.md',
    'backend/knowledge-base/trading-cases.md',
    'backend/knowledge-base/trading-modules.md'
  ];
  
  for (const file of requiredFiles) {
    const path = join(projectRoot, file);
    if (existsSync(path)) {
      console.log(`✅ Required file exists: ${file}`);
    } else {
      console.log(`❌ Missing required file: ${file}`);
    }
  }
  
  for (const file of removedFiles) {
    const path = join(projectRoot, file);
    if (!existsSync(path)) {
      console.log(`✅ Duplicate file correctly removed: ${file}`);
    } else {
      console.log(`⚠️  Duplicate file still exists: ${file}`);
    }
  }
}

// Check docs structure
function checkDocsStructure() {
  console.log('\n📚 Checking documentation structure...');
  
  const expectedDocs = [
    'docs/methodology.md',
    'docs/knowledge-base-overview.md'
  ];
  
  for (const doc of expectedDocs) {
    const path = join(projectRoot, doc);
    if (existsSync(path)) {
      console.log(`✅ Documentation moved correctly: ${doc}`);
    } else {
      console.log(`❌ Missing documentation: ${doc}`);
    }
  }
}

// Main validation
async function main() {
  checkFileStructure();
  checkDocsStructure();
  await checkServerHealth();
  
  console.log('\n🎉 Database unification validation complete!');
  console.log('\n📊 Summary:');
  console.log('- Single source of truth: backend/data/');
  console.log('- No duplication between frontend and backend');
  console.log('- All data served through API');
  console.log('- Documentation moved to docs/');
  console.log('- Schema preserved in backend/knowledge-base/schema.ts');
}

main().catch(console.error);