const reporter = require('cucumber-html-reporter');
const path = require('path');
const fs = require('fs');

const reportFile = path.join(__dirname, 'cucumber-report.html');

const options = {
    theme: 'bootstrap',
    jsonFile: 'allure-results/results.json',  // your JSON results
    output: reportFile,
    reportSuiteAsScenarios: true,
    launchReport: false,
    metadata: {
        "App Version": "1.0.0",
        "Test Environment": "QA",
        "Browser": "Chrome",
        "Platform": "Windows"
    }
};

// Generate the report
reporter.generate(options);

// Open the report
(async () => {
    try {
        const open = (await import('open')).default;
        await open(reportFile, { wait: true });
        console.log(`🚀 Report opened: ${reportFile}`);
    } catch (err) {
        console.error('Failed to open report:', err);
    } finally {
        // Delete session.json after report generation
        const sessionPath = path.join(__dirname, 'storage', 'session.json');
        if (fs.existsSync(sessionPath)) {
            fs.unlinkSync(sessionPath);
            console.log('🧹 session.json deleted after test execution');
        }
    }
})();