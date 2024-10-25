const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

describe('Main Application Tests', () => {
    const inputFilePath1 = path.resolve(__dirname, '../testcases/testcase1.json');
    const expectedOutputPath1 = path.resolve(__dirname, '../src/output/result1.json'); // Adjusted path to match your structure
    const inputFilePath2 = path.resolve(__dirname, '../testcases/testcase2.json');
    const expectedOutputPath2 = path.resolve(__dirname, '../src/output/result2.json'); // Adjusted path to match your structure
    const mainFilePath = path.resolve(__dirname, '../src/main.js');

    test('testcase1.json produces correct output', () => {
        console.log("Main file path:", mainFilePath);
        execSync(`node ${mainFilePath} ${inputFilePath1}`, { stdio: 'inherit' });

        const output = JSON.parse(fs.readFileSync(expectedOutputPath1, 'utf-8'));

        expect(output).toEqual({
            constantTerm: 4,
            coefficients: [4, 0, -1],
        });
    });

    // New test case for testcase2.json
    test('testcase2.json produces correct output', () => {
        execSync(`node ${mainFilePath} ${inputFilePath2}`, { stdio: 'inherit' });

        // Read the output file from the correct path
        const output = JSON.parse(fs.readFileSync(expectedOutputPath2, 'utf-8'));

        expect(output).toEqual({
            constantTerm: 4,
            coefficients: [4, 0, -1],
        });
    });

    // Add more test cases as needed
});
