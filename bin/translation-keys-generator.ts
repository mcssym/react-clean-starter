import * as fs from 'fs';
import * as path from 'path';

// Helper function to convert a string to camelCase
function toCamelCase(str: string): string {
    return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase()).replace(/^(.)/, char => char.toLowerCase());
}

// Helper function to recursively read directory and find all JSON files
function findJsonFiles(dir: string, fileList: string[] = []): string[] {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            findJsonFiles(filePath, fileList); // Recursively find JSON files in subfolders
        } else if (filePath.endsWith('.json')) {
            fileList.push(filePath); // If it's a JSON file, add to the list
        }
    });
    return fileList;
}

// Function to get all keys from a JSON object (including nested objects)
function extractKeysFromJson(jsonObject: any, prefix: string = ''): string[] {
    let keys: string[] = [];
    Object.keys(jsonObject).forEach(key => {
        const fullKey = prefix ? `${prefix}.${key}` : key; // Handle nested keys
        keys.push(fullKey);
        if (typeof jsonObject[key] === 'object' && jsonObject[key] !== null) {
            keys = keys.concat(extractKeysFromJson(jsonObject[key], fullKey));
        }
    });
    return keys;
}

// Main function to generate the TypeScript output
function generateCamelCaseMappings(inputDir: string, outputFilePath: string) {
    const jsonFiles = findJsonFiles(inputDir);
    const keyMapping: { [camelCaseKey: string]: string } = {};

    jsonFiles.forEach(jsonFilePath => {
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
        const keys = extractKeysFromJson(jsonData);

        keys.forEach(originalKey => {
            const camelCaseKey = toCamelCase(originalKey);
            keyMapping[camelCaseKey] = originalKey;
        });
    });
    // Create the TypeScript object output manually to ensure it's valid JS/TS code
    const keyMappingEntries = Object.entries(keyMapping)
        .map(([camelCaseKey, originalKey]) => `    ${camelCaseKey}: "${originalKey}"`)
        .join(',\n');

    const tsOutput = `export const TranslationKeys = {\n${keyMappingEntries}\n};\n`;

    fs.writeFileSync(outputFilePath, tsOutput, 'utf8');
    console.log(`TypeScript file generated at: ${outputFilePath}`);
}

// Example usage: Set the input directory and output TypeScript file path
const inputDir = path.resolve(__dirname, '..', 'public/assets/translations');  // Replace with your input directory containing JSON files
const outputFilePath = path.resolve(__dirname, '..', 'src/foundation/core/system/translation/translation-keys.ts');  // Replace with your desired output file

generateCamelCaseMappings(inputDir, outputFilePath);
