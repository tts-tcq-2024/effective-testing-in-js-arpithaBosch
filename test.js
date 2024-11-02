const { expect } = require('chai');

// Importing the original modules
const { size } = require('./tshirts');
const { print_color_map } = require('./misaligned');
let { alertInCelcius, networkAlertStub, alertFailureCount } = require('./alerter');

// Strengthened Tests for tshirts.js
describe('T-Shirt Size Tests', () => {
    it('should return S for cms < 38', () => {
        expect(size(37)).to.equal('S', 'Expected size to be S for cms < 38');
    });
    
    it('should return M for 38 < cms < 42', () => {
        expect(size(40)).to.equal('M', 'Expected size to be M for 38 < cms < 42');
    });
    
    it('should return L for cms > 42', () => {
        expect(size(43)).to.equal('L', 'Expected size to be L for cms > 42');
    });
    
    it('should handle cms = 38 accurately', () => {
        expect(size(38)).to.equal('S', 'Expected size to be S or M for cms = 38'); // Adjust expected value as needed
    });
    
    it('should handle borderline case just under 42 cms', () => {
        expect(size(41.9)).to.equal('M', 'Expected size to be M for cms just under 42');
    });
    
    it('should handle borderline case just over 38 cms', () => {
        expect(size(38.1)).to.equal('M', 'Expected size to be M for cms just over 38');
    });
});

// Strengthened Tests for misaligned.js
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

// Strengthened Tests for alerter.js
describe('Temperature Alert Tests', () => {
    beforeEach(() => {
        alertFailureCount = 0;  // Reset count before each test
    });

    it('should not increase alertFailureCount if network alert succeeds', () => {
        networkAlertStub = () => 200; // Stub returns 200, meaning "ok"
        alertInCelcius(400.5);
        expect(alertFailureCount).to.equal(0, 'Expected alertFailureCount to remain 0 when network alert succeeds');
    });
    
    it('should increase alertFailureCount if network alert fails', () => {
        networkAlertStub = () => 500; // Stub returns 500, meaning "not ok"
        alertInCelcius(500.5);
        expect(alertFailureCount).to.equal(1, 'Expected alertFailureCount to increase by 1 when network alert fails');
    });

    it('should increase alertFailureCount correctly for multiple failed alerts', () => {
        networkAlertStub = () => 500; // Stub returns 500, meaning "not ok"
        alertInCelcius(500.5);
        alertInCelcius(600.5);
        expect(alertFailureCount).to.equal(2, 'Expected alertFailureCount to be 2 after two failed alerts');
    });

    it('should not increase alertFailureCount if network alert succeeds after failures', () => {
        networkAlertStub = () => 500;
        alertInCelcius(500.5);
        networkAlertStub = () => 200;
        alertInCelcius(303.6);
        expect(alertFailureCount).to.equal(1, 'Expected alertFailureCount to stay at 1 when a succeeding alert follows a failure');
    });
});
