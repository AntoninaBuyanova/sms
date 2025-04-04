import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { compress } from 'brotli';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function compressFile(filePath) {
  try {
    const content = await readFile(filePath);
    const compressed = compress(content, {
      mode: 1, // text
      quality: 11, // max compression
    });
    await writeFile(`${filePath}.br`, Buffer.from(compressed));
    console.log(`Compressed ${filePath}`);
  } catch (error) {
    console.error(`Error compressing ${filePath}:`, error);
  }
}

async function main() {
  const publicDir = path.resolve(__dirname, '..', 'dist', 'public', 'assets');
  
  // Check if directory exists
  if (!fs.existsSync(publicDir)) {
    console.log(`Assets directory not found at ${publicDir}`);
    return;
  }

  try {
    const files = fs.readdirSync(publicDir);
    
    const tasks = files
      .filter(file => file.endsWith('.js') || file.endsWith('.css'))
      .map(file => compressFile(path.join(publicDir, file)));
    
    await Promise.all(tasks);
    console.log('Compression completed successfully');
  } catch (error) {
    console.error('Error during compression:', error);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
}); 