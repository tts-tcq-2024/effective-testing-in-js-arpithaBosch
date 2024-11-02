const { expect } = require('chai');
let { alertInCelcius, networkAlertStub, alertFailureCount } = require('../alerter'); // Adjust the path as needed

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
