const fs = require('fs');
const path = require('path');

// Log to verify the script is running
console.log("Starting to read the JSON file...");

// Path to the JSON file passed as a command-line argument
const jsonFilePath = process.argv[2] || path.resolve(__dirname, '../testcases/testcase1.json');

console.log("Using JSON file path:", jsonFilePath);

// Read and parse the JSON file
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading JSON file:", err);
        return;
    }

    console.log("File read successfully. Now parsing...");

    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);
        console.log("Parsed JSON Data:", jsonData);

        const decodedYValues = [];
        const keys = Object.keys(jsonData).filter(key => key !== 'keys');

        // Decode values based on their specified base
        keys.forEach(key => {
            const base = jsonData[key].base;
            const value = jsonData[key].value;
            const decodedValue = parseInt(value, parseInt(base));
            decodedYValues.push(decodedValue);
        });

        console.log("Decoded Y Values:", decodedYValues);

        // Placeholder for polynomial calculation logic
        // Assuming example coefficients and constant term
        const coefficients = [4, 0, -1];
        const constantTerm = coefficients[0];
        console.log("Constant Term (c):", constantTerm);

        // Prepare the output directory path
        const outputDir = path.resolve(__dirname, 'output');

        // Ensure the output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        // Generate output file name based on input file name
        const outputFileName = `result${path.basename(jsonFilePath, '.json').slice(-1)}.json`; // result1.json, result2.json, etc.
        const outputFilePath = path.join(outputDir, outputFileName);

        // Define the result data to be written
        const result = {
            constantTerm: constantTerm,
            coefficients: coefficients,
        };

        // Write results to the output file
        fs.writeFile(outputFilePath, JSON.stringify(result, null, 2), err => {
            if (err) {
                console.error("Error writing output file:", err);
            } else {
                console.log("Results written to", outputFilePath);
            }
        });
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
});
