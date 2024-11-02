const { expect } = require('chai');
const { print_color_map } = require('../misaligned'); // Adjust the path as needed

describe('Color Map Print Tests', () => {
    it('should return correct count of color mappings', () => {
        const result = print_color_map();
        expect(result).to.equal(25, 'Expected total color mappings to be 25');
    });
    
    it('should print color map with correct alignment', () => {
        const majorColors = ["White", "Red", "Black", "Yellow", "Violet"];
        const minorColors = ["Blue", "Orange", "Green", "Brown", "Slate"];
        let output = [];
        
        // Capture console output
        console.log = (line) => output.push(line);
        
        print_color_map();
        
        output.forEach((line, index) => {
            const parts = line.split('|').map(s => s.trim());
            expect(parts.length).to.equal(3, `Expected line "${line}" to have exactly 3 parts separated by '|'`);
            const [num, major, minor] = parts;
            expect(parseInt(num)).to.equal(index, `Expected color map number to be ${index} for line "${line}"`);
            expect(major).to.equal(majorColors[Math.floor(index / 5)], `Expected major color to be ${majorColors[Math.floor(index / 5)]} for line "${line}"`);
            expect(minor).to.equal(minorColors[index % 5], `Expected minor color to be ${minorColors[index % 5]} for line "${line}"`);
        });
    });
});
