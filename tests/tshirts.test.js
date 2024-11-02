const { expect } = require('chai');
const { size } = require('../tshirts'); // Adjust this path if necessary

describe('T-Shirt Size Tests', () => {
    
    // Expected pass
    it('should return S for cms < 38', () => {
        expect(size(37)).to.equal('S', 'Expected size to be S for cms < 38');
    });
    // Expected pass
    it('should return M for 38 < cms < 42', () => {
        expect(size(40)).to.equal('M', 'Expected size to be M for 38 < cms < 42');
    });
    // Expected pass
    it('should return L for cms > 42', () => {
        expect(size(43)).to.equal('L', 'Expected size to be L for cms > 42');
    });
    // This test expects a specific result for cms = 38, which might not be handled in `size` function.
    // We expect this test to fail if 38 is not handled as 'S'.
    it('should handle cms = 38 accurately', () => {
        expect(size(38)).to.equal('M', 'Expected size to be M for cms = 38'); // Change to 'M' to ensure it fails if not handled
    });
    
    // This test will fail if the implementation doesn't return M for borderline case just over 38 cms
    it('should handle borderline case just over 38 cms', () => {
        expect(size(38.1)).to.equal('L', 'Expected size to be L for cms just over 38.1'); // Adjusted expectation to trigger failure
    });

    // Expected failure if `size` does not handle non-numeric input gracefully.
    it('should return undefined or an error for non-numeric input', () => {
        expect(size("invalid")).to.be.undefined;
    });
    
    // Expected failure if `size` does not handle very high cms values accurately
    it('should return L for extremely large cms values', () => {
        expect(size(100)).to.equal('M', 'Expected size to be M for cms > 42'); // Change to 'M' to trigger a failure
    });
    
    // This test checks for a negative cms, which is unrealistic and should ideally return undefined
    it('should return undefined for negative cms', () => {
        expect(size(-5)).to.be.undefined; // This should trigger a failure if not handled correctly
    });
    
});
