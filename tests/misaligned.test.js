const { expect } = require('chai');
const { print_color_map } = require('../misaligned'); // Adjust the path as needed

describe('Color Map Print Tests', () => {
    it('should return correct count of color mappings', () => {
        const result = print_color_map();
        // This should pass as the implementation correctly returns 25
        expect(result).to.equal(25, 'Expected total color mappings to be 25');
    });
    
    it('should throw an error for misalignment', () => {
        let output = [];
        
        // Capture console output by overriding console.log
        console.log = (line) => output.push(line);
        
        // Call the function to generate the output
        print_color_map();
        
        // Check each output line for expected format and alignment
        output.forEach((line, index) => {
            const parts = line.split('|').map(s => s.trim());
            expect(parts.length).to.equal(3, `Expected line "${line}" to have exactly 3 parts separated by '|'`);
            const [num, major, minor] = parts;
            
            // Check for alignment by verifying the numeric part and expected index
            expect(parseInt(num)).to.equal(index, `Expected color map number to be ${index} for line "${line}"`);
        });
    });

    it('should ensure numeric values are correctly aligned', () => {
        let output = [];
        
        // Capture console output
        console.log = (line) => output.push(line);
        
        // Call the function to generate the output
        print_color_map();
        
        // Check that each line matches the expected numeric alignment
        const majorColors = ["White", "Red", "Black", "Yellow", "Violet"];
        const minorColors = ["Blue", "Orange", "Green", "Brown", "Slate"];
        
        output.forEach((line, index) => {
            const parts = line.split('|').map(s => s.trim());
            const expectedMajorColor = majorColors[Math.floor(index / minorColors.length)];
            const expectedMinorColor = minorColors[index % minorColors.length];
            
            expect(parts[0].trim()).to.equal(index.toString(), `Expected number to match index for line: "${line}"`);
            expect(parts[1].trim()).to.equal(expectedMajorColor, `Expected major color to be ${expectedMajorColor} for line "${line}"`);
            expect(parts[2].trim()).to.equal(expectedMinorColor, `Expected minor color to be ${expectedMinorColor} for line "${line}"`);
        });
    });
});
