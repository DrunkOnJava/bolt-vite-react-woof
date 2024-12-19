import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '..', 'src');

async function organizeCode() {
  try {
    // 1. Analyze current structure
    const stats = {
      largeFiles: [],
      duplicateLogic: new Map(),
      utilityFunctions: new Set(),
    };

    // 2. Scan files recursively
    async function scanDirectory(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await scanDirectory(fullPath);
          continue;
        }

        if (!['.ts', '.tsx'].includes(path.extname(entry.name))) continue;

        // Read and analyze file
        const content = await fs.readFile(fullPath, 'utf-8');
        
        // Check file size (>300 lines suggests splitting)
        const lines = content.split('\n').length;
        if (lines > 300) {
          stats.largeFiles.push({ path: fullPath, lines });
        }

        // Identify utility functions
        const utilityMatches = content.match(/export function \w+/g) || [];
        utilityMatches.forEach(match => {
          const funcName = match.replace('export function ', '');
          stats.utilityFunctions.add(funcName);
        });
      }
    }

    await scanDirectory(srcDir);

    // 3. Generate report
    console.log('\nCode Organization Report\n');
    
    if (stats.largeFiles.length > 0) {
      console.log('Large files that should be split:');
      stats.largeFiles.forEach(file => {
        console.log(`- ${path.relative(srcDir, file.path)} (${file.lines} lines)`);
      });
    }

    if (stats.utilityFunctions.size > 0) {
      console.log('\nUtility functions that could be moved to dedicated files:');
      stats.utilityFunctions.forEach(func => {
        console.log(`- ${func}`);
      });
    }

    // 4. Create recommended structure
    const directories = [
      'components/common',
      'components/layout',
      'components/forms',
      'hooks',
      'utils',
      'services',
      'types',
      'constants',
      'context',
      'pages',
      'assets',
      'lib',
    ];

    for (const dir of directories) {
      const fullPath = path.join(srcDir, dir);
      await fs.mkdir(fullPath, { recursive: true });
    }

    // 5. Create index files for better imports
    for (const dir of directories) {
      const fullPath = path.join(srcDir, dir);
      const indexPath = path.join(fullPath, 'index.ts');
      
      try {
        await fs.access(indexPath);
      } catch {
        await fs.writeFile(indexPath, '// Export components from this directory\n');
      }
    }

    console.log('\nRecommended actions:');
    console.log('1. Move utility functions to dedicated files in src/utils/');
    console.log('2. Split large components into smaller, focused components');
    console.log('3. Use barrel exports (index.ts) for cleaner imports');
    console.log('4. Extract shared logic into custom hooks');
    console.log('5. Maintain consistent file naming conventions');

  } catch (error) {
    console.error('Error organizing code:', error);
  }
}

organizeCode();