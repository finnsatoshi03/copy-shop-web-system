import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';
import path from 'path';

function getLocalIPAddress() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const networkInterface = networkInterfaces[interfaceName];
    for (const address of networkInterface) {
      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }
  return 'localhost'; 
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filesToUpdate = [
  path.join(__dirname, '../services/service.ts'),             
  path.join(__dirname, '../services/useWebSocketOrders.ts'),  
  path.join(__dirname, '../../vite.config.ts')          
];


const replacements = [
  {
    pattern: /http:\/\/localhost:4000/g,   
    replacement: (ipAddress) => `http://${ipAddress}:4000`
  },
  {
    pattern: /ws:\/\/localhost:4000/g,     
    replacement: (ipAddress) => `ws://${ipAddress}:4000`
  },
  {
    pattern: /host:\s*['"][^'"]+['"]/g,    
}

function updateFiles() {
  const ipAddress = getLocalIPAddress();

  filesToUpdate.forEach((filePath, index) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${filePath}`, err);
        return;
      }

      const { pattern, replacement } = replacements[index];
      
      const updatedData = data.replace(pattern, replacement(ipAddress));

      fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file: ${filePath}`, err);
        } else {
          console.log(`Updated IP address in ${filePath}`);
        }
      });
    });
  });
}

updateFiles();
