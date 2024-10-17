import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';
import path from 'path';

// Function to get local IP address
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
  return 'localhost'; // Fallback to localhost
}

// Get the equivalent of __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to the files that need modification
const filesToUpdate = [
  path.join(__dirname, '../services/service.ts'),             // Your service.ts
  path.join(__dirname, '../services/useWebSocketOrders.ts'),  // WebSocket file
  path.join(__dirname, '../../vite.config.ts')          // Vite config file
];

// Pattern replacements for each file
const replacements = [
  {
    pattern: /http:\/\/localhost:4000/g,   // Matches localhost for service.ts
    replacement: (ipAddress) => `http://${ipAddress}:4000`
  },
  {
    pattern: /ws:\/\/localhost:4000/g,     // Matches WebSocket URL
    replacement: (ipAddress) => `ws://${ipAddress}:4000`
  },
  {
    pattern: /host:\s*['"][^'"]+['"]/g,    // Matches the host config in vite.config.ts
    replacement: (ipAddress) => `host: '${ipAddress}'`
  }
];

// Function to update each file
function updateFiles() {
  const ipAddress = getLocalIPAddress();

  filesToUpdate.forEach((filePath, index) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${filePath}`, err);
        return;
      }

      const { pattern, replacement } = replacements[index];

      // Replace occurrences of localhost with the local IP address
      const updatedData = data.replace(pattern, replacement(ipAddress));

      // Write the updated content back to the file
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

// Run the update function
updateFiles();
