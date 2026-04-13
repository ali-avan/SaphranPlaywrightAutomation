const reporter = require('cucumber-html-reporter');
const path = require('path');
const fs = require('fs');

const reportFile = path.join(__dirname, 'cucumber-report.html');
const resultsFile = path.join(__dirname, 'results', 'results.json');

function stripAnsi(value) {
    return value.replace(/\u001b\[[0-9;]*m/g, '');
}

function sanitizeReportData(value) {
    if (typeof value === 'string') {
        return stripAnsi(value);
    }

    if (Array.isArray(value)) {
        return value.map(sanitizeReportData);
    }

    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, childValue]) => [key, sanitizeReportData(childValue)])
        );
    }

    return value;
}

function sanitizeResultsFile() {
    if (!fs.existsSync(resultsFile)) {
        return;
    }

    const rawResults = fs.readFileSync(resultsFile, 'utf-8');
    const parsedResults = JSON.parse(rawResults);
    const sanitizedResults = sanitizeReportData(parsedResults);
    fs.writeFileSync(resultsFile, JSON.stringify(sanitizedResults, null, 2));
}

const options = {
    theme: 'bootstrap',
    jsonFile: 'results/results.json',
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
sanitizeResultsFile();
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
