const { expect } = require('chai');
let { alertInCelcius, networkAlertStub } = require('../alerter'); // Adjust the path as needed

describe('Temperature Alert Tests', () => {
    // Reset alertFailureCount before each test
    beforeEach(() => {
        // Reset the alertFailureCount directly on the module, assuming you can access it
        alertInCelcius.alertFailureCount = 0;  // This assumes alertFailureCount can be reset in the module
    });

    // New test case that should pass
    it('should not increase alertFailureCount when network alert succeeds', () => {
        networkAlertStub = () => 200; // Simulate success
        alertInCelcius(75); // This should not trigger a failure
        expect(alertInCelcius.alertFailureCount).to.equal(0, 'Expected alertFailureCount to remain 0 when network alert succeeds');
    });

    // Test to catch a potential failure in alerting logic
    it('should increase alertFailureCount if network alert fails', () => {
        // Override the network alert stub to simulate a failure
        networkAlertStub = () => 500; // Stub returns 500, meaning "not ok"
        alertInCelcius(400.5); // This should trigger a failure
        expect(alertInCelcius.alertFailureCount).to.equal(1, 'Expected alertFailureCount to increase by 1 when network alert fails');
    });

    // This test ensures the failure count is incremented correctly
    it('should increase alertFailureCount correctly for multiple failed alerts', () => {
        networkAlertStub = () => 500; // Stub returns 500, meaning "not ok"
        alertInCelcius(500.5); // First failure
        alertInCelcius(600.5); // Second failure
        expect(alertInCelcius.alertFailureCount).to.equal(2, 'Expected alertFailureCount to be 2 after two failed alerts');
    });

    // Test that checks if alertFailureCount does not increment after a successful alert following a failure
    it('should not increase alertFailureCount if network alert succeeds after failures', () => {
        networkAlertStub = () => 500; // First call fails
        alertInCelcius(500.5);
        networkAlertStub = () => 200; // Second call succeeds
        alertInCelcius(303.6);
        expect(alertInCelcius.alertFailureCount).to.equal(1, 'Expected alertFailureCount to stay at 1 when a succeeding alert follows a failure');
    });

    // Adding an extra check for the boundary temperature which is expected to be handled incorrectly
    it('should count failure for a temperature below absolute zero', () => {
        networkAlertStub = () => 500; // Simulate network failure
        alertInCelcius(-459.67); // Absolute zero in Fahrenheit
        expect(alertInCelcius.alertFailureCount).to.equal(1, 'Expected alertFailureCount to increase by 1 for below absolute zero');
    });

    // Ensure to fail if a success was incorrectly counted when it shouldn't have
    it('should not count an error as success', () => {
        networkAlertStub = () => 200; // Stub returns 200, simulating success
        alertInCelcius(400.5);
        networkAlertStub = () => 500; // Change to failure
        alertInCelcius(300); // Simulating failure here
        expect(alertInCelcius.alertFailureCount).to.equal(1, 'Expected alertFailureCount to remain 1 after a failure');
    });
});
