const {expect} = require('chai');

function size(cms) {
    if (cms < 38) {
        return 'S';
    } else if (cms > 38 && cms < 42) {
        return 'M';
    } else {
        return 'L';
    }
}

// Weak tests
expect(size(37)).equals('S');
expect(size(40)).equals('M');
expect(size(43)).equals('L');

// Strong tests to make it fail
// This test will fail since the implementation does not return 'S' for cms = 38
expect(size(38)).equals('M'); // Expected to fail

// This test will fail since the implementation does not return 'M' for cms = 38.1
expect(size(38.1)).equals('S'); // Expected to fail

// Test for non-numeric input, which should fail if not handled
expect(size("invalid")).to.be.undefined; // Expected to fail if size doesn't handle this input correctly

// Additional edge cases
expect(size(-5)).to.be.undefined; // Expected to fail if negative values aren't handled
expect(size(100)).equals('L'); // Expected to pass

console.log('All is well (maybe!)');
