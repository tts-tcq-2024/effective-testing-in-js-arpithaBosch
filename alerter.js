const { expect } = require('chai');

let alertFailureCount = 0;

function networkAlertStub(celcius) {
    console.log(`Alert! Temperature is ${celcius} degrees`);
    // Return 200 for ok
    // Return 500 for not-ok
    // stub always succeeds and returns 200
    return 200;
}

function alertInCelcius(farenheit) {
    const celcius = (farenheit - 32) * 5 / 9;
    const returnCode = networkAlertStub(celcius);
    if (returnCode != 200) {
        // non-ok response is not an error! Issues happen in life!
        // let us keep a count of failures to report
        // However, this code doesn't count failures!
        // Add a test below to catch this bug. Alter the stub above, if needed.
        alertFailureCount += 0;
    }
}

alertInCelcius(400.5);
alertInCelcius(303.6);
console.log(`${alertFailureCount} alerts failed.`);
console.log('All is well (maybe!)');

// Reset alertFailureCount before tests
alertFailureCount = 0; // Reset the failure count

// 1. Should not increase alertFailureCount when network alert succeeds
networkAlertStub = () => 200; // Simulate success
alertInCelcius(75); // This should not trigger a failure
expect(alertFailureCount).to.equal(0, 'Expected alertFailureCount to remain 0 when network alert succeeds');

// 2. Should increase alertFailureCount if network alert fails
networkAlertStub = () => 500; // Simulate a failure
alertInCelcius(400.5); // This should trigger a failure
expect(alertFailureCount).to.equal(1, 'Expected alertFailureCount to increase by 1 when network alert fails');

// 3. Should increase alertFailureCount correctly for multiple failed alerts
alertFailureCount = 0; // Reset again
networkAlertStub = () => 500; // Simulate network failure
alertInCelcius(500.5); // First failure
alertInCelcius(600.5); // Second failure
expect(alertFailureCount).to.equal(2, 'Expected alertFailureCount to be 2 after two failed alerts');

// 4. Should not increase alertFailureCount if network alert succeeds after failures
alertFailureCount = 0; // Reset again
networkAlertStub = () => 500; // First call fails
alertInCelcius(500.5);
networkAlertStub = () => 200; // Second call succeeds
alertInCelcius(303.6);
expect(alertFailureCount).to.equal(1, 'Expected alertFailureCount to stay at 1 when a succeeding alert follows a failure');

// 5. Should count failure for a temperature below absolute zero
alertFailureCount = 0; // Reset again
networkAlertStub = () => 500; // Simulate network failure
alertInCelcius(-459.67); // Absolute zero in Fahrenheit
expect(alertFailureCount).to.equal(1, 'Expected alertFailureCount to increase by 1 for below absolute zero');

// 6. Should not count an error as success
alertFailureCount = 0; // Reset again
networkAlertStub = () => 200; // Stub returns 200
alertInCelcius(400.5);
networkAlertStub = () => 500; // Change to failure
alertInCelcius(300); // Simulating failure here
expect(alertFailureCount).to.equal(1, 'Expected alertFailureCount to remain 1 after a failure');

console.log('All tests executed, check assertions for correctness.');
