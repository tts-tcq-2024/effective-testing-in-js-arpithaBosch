const { expect } = require('chai');
const { size } = require('../tshirts'); // Adjust the path as needed

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
        expect(size(38)).to.equal('S', 'Expected size to be S or M for cms = 38'); // Adjust as needed
    });
    
    it('should handle borderline case just under 42 cms', () => {
        expect(size(41.9)).to.equal('M', 'Expected size to be M for cms just under 42');
    });
    
    it('should handle borderline case just over 38 cms', () => {
        expect(size(38.1)).to.equal('M', 'Expected size to be M for cms just over 38');
    });
});
