# Saphran Playwright Automation

This project is a UI automation framework built with Playwright, Cucumber, and TypeScript. It executes end-to-end test scenarios against Saphran environments, generates a JSON result file, and produces an HTML report after execution.

This README is written as a new-starter guide so a new team member can set up the project from scratch on a new machine and run smoke or regression tests without needing tribal knowledge.

## 1. Tech Stack

- Node.js
- npm
- TypeScript
- Playwright
- Cucumber
- PowerShell / Command Prompt
- Visual Studio Code or another IDE

## 2. Recommended Machine Setup

This project is currently structured for Windows usage. Use the following baseline setup:

- Windows 10 or Windows 11
- Stable internet connection
- Access to the Saphran application URL
- Valid test account credentials for the target environment
- Permission to install developer tools

## 3. Software Prerequisites

Install the following before using the project.

### 3.1 Git

Git is required to clone and update the repository.

Install from:
- https://git-scm.com/download/win

Verify installation:

```powershell
git --version
```

### 3.2 Node.js

Install Node.js LTS. Node 20 LTS is the safest recommendation for this project.

Install from:
- https://nodejs.org/

Verify installation:

```powershell
node --version
npm --version
```

### 3.3 Visual Studio Code

VS Code is the recommended IDE for this repository.

Install from:
- https://code.visualstudio.com/

Recommended VS Code extensions:

- `Playwright Test for VSCode`
- `Cucumber (Gherkin) Full Support`
- `ESLint`
- `Prettier - Code formatter`
- `GitLens`

### 3.4 Playwright Browsers

The repo depends on Playwright and needs browser binaries installed locally.

After project dependencies are installed, run:

```powershell
npx playwright install chromium
```

If your machine is missing required OS dependencies, run:

```powershell
npx playwright install
```

## 4. Clone the Project

Clone the repository to your machine:

```powershell
git clone <your-repository-url>
cd SaphranPlaywrightAutomation
```

If you already have the repo and only need the latest code:

```powershell
git pull
```

## 5. Install Project Dependencies

From the project root, install packages:

```powershell
npm install
```

If you want a clean install based strictly on `package-lock.json`, use:

```powershell
npm ci
```

## 6. Environment Configuration

This framework reads configuration from a `.env` file in the project root.

Current environment keys used by the framework:

- `TARGET_ENV`
- `BASE_HOST`
- `QBASEDEMOTESTBETA_USERNAME`
- `QBASEDEMOTESTBETA_PASSWORD`
- `ITWMETALSNEWREGRESSIONTEST_USERNAME`
- `ITWMETALSNEWREGRESSIONTEST_PASSWORD`
- `HEADLESS`

### 6.1 Update the Existing `.env`

The project already includes a `.env` file in the root folder.

Open the existing `.env` file and update the credentials if you want to run the suite with a different user or against a different supported environment.

Example:

```env
TARGET_ENV=ItwMetalsNewRegressionTest
BASE_HOST=https://secureapps0.saphran.com

QBASEDEMOTESTBETA_USERNAME=your_username
QBASEDEMOTESTBETA_PASSWORD=your_password

ITWMETALSNEWREGRESSIONTEST_USERNAME=your_username
ITWMETALSNEWREGRESSIONTEST_PASSWORD=your_password

HEADLESS=false
```

### 6.2 Supported Target Environments

Based on the current framework code, these target environments are supported:

- `qbasedemotestbeta`
- `ItwMetalsNewRegressionTest`

The final application URL is built like this:

```text
{BASE_HOST}/{TARGET_ENV}
```

Example:

```text
https://secureapps0.saphran.com/ItwMetalsNewRegressionTest
```

### 6.3 Important Notes for Credentials

- Use valid credentials for the selected `TARGET_ENV`
- If `TARGET_ENV` changes, make sure matching username/password values are also updated
- Do not commit real credentials to source control

## 7. First-Time Login and Saved Session

The test framework logs in automatically before scenarios start.

How it works:

- On first run, it opens the login page
- It signs in using credentials from `.env`
- It saves browser session state in the `storage` folder
- On later runs, it tries to reuse the saved session

Session file pattern:

```text
storage/session-<TARGET_ENV>.json
```

Example:

```text
storage/session-ItwMetalsNewRegressionTest.json
```

If login is failing because the old session is stale, delete the relevant session file from the `storage` folder and rerun the tests.

## 8. Project Structure

High-level folder purpose:

- `features/`
  Contains Gherkin feature files and scenarios
- `step-definitions/`
  Contains Cucumber step implementations
- `pages/`
  Contains Playwright page object classes
- `support/`
  Contains hooks, world setup, and shared test lifecycle logic
- `utils/`
  Contains helper utilities such as environment loading, waits, auth/session helpers
- `test-data/`
  Contains JSON test data used by scenarios
- `storage/`
  Contains saved browser session files
- `results/`
  Contains generated test result JSON
- `allure-results/`
  Contains Allure-related output when applicable
- `cucumber-report.html`
  Generated HTML execution report

## 9. Framework Execution Flow

When you run a suite:

1. Cucumber loads feature files and step definitions
2. `support/hooks.ts` launches Chromium
3. The framework checks whether a saved session exists
4. If no session exists, it logs in using `.env` credentials
5. Scenarios execute against the target environment
6. Results are saved to `results/results.json`
7. `report.js` generates `cucumber-report.html`

## 10. Available npm Scripts

You can run test cases directly from VS Code as well:

- Open `package.json`
- Hover over `bdd:smoke` or `bdd:regression`
- Click `Run Script`

The current `package.json` contains these scripts:

- `npm run bdd`
  Runs the full feature set
- `npm run bdd:headless`
  Runs the full feature set in headless mode
- `npm run bdd:smoke`
  Runs scenarios tagged with `@smoke`
- `npm run bdd:regression`
  Runs scenarios tagged with `@Regression`
- `npm run bdd:testcase`
  Runs scenarios tagged with `@OurPrograms`
- `npm run bdd:report`
  Generates the HTML report from the latest JSON result file
- `npm run mcp:execute`
  Runs `utils/mcp-orchestrator.ts` if used in your workflow

## 11. How to Run Test Cases

Open PowerShell in the project root and use the commands below.

### 11.1 Run All Test Cases

```powershell
npm run bdd
```

### 11.2 Run All Test Cases in Headless Mode

```powershell
npm run bdd:headless
```

This uses:

```text
HEADLESS=true
```

for that execution.

### 11.3 Run Smoke Suite

```powershell
npm run bdd:smoke
```

This runs scenarios tagged with:

```text
@smoke
```

### 11.4 Run Regression Suite

```powershell
npm run bdd:regression
```

This runs scenarios tagged with:

```text
@Regression
```

### 11.5 Run a Specific Tagged Suite

There is one preconfigured example script:

```powershell
npm run bdd:testcase
```

This currently runs:

```text
@OurPrograms
```

If you want to run another specific tag without adding a new script, use the helper runner:

```powershell
node run-bdd.js --tags "@Reporting" features/**/*.feature
```

Replace `@Reporting` with the tag you need.

## 12. Current Tag Usage in the Repository

Examples of tags already in use:

- `@smoke`
- `@Regression`
- `@test`
- `@OurPrograms`
- `@Reporting`
- `@ForecastManagement`
- `@PartSearch`
- `@SystemAdminBasic`
- `@SystemAdminAdditionalPages`
- `@UserAdminSmoke`

## 13. Where to See Test Results

After execution, check these outputs:

- `results/results.json`
  Raw Cucumber JSON result
- `cucumber-report.html`
  Human-readable HTML report

To regenerate the HTML report from an existing JSON result:

```powershell
npm run bdd:report
```

## 14. How to Open and Debug the Project in VS Code

1. Open VS Code
2. Select `File > Open Folder`
3. Open the `SaphranPlaywrightAutomation` folder
4. Open the built-in terminal
5. Run setup commands from the terminal

Useful VS Code terminal commands:

```powershell
npm install
npx playwright install chromium
npm run bdd:smoke
```

## 15. Common Setup Checklist for a New Team Member

Use this checklist in order:

1. Install Git
2. Install Node.js LTS
3. Install VS Code
4. Clone the repository
5. Open the repo in VS Code
6. Run `npm install`
7. Run `npx playwright install chromium`
8. Open the existing `.env`
9. Update the credentials for the user/environment you want to run
10. Run `npm run bdd:smoke`
11. Review `cucumber-report.html`

## 16. Common Troubleshooting

### 16.1 `node` or `npm` command not found

Cause:
- Node.js is not installed or not added to PATH

Fix:
- Reinstall Node.js from the official site
- Close and reopen the terminal
- Verify with `node --version` and `npm --version`

### 16.2 Playwright browser launch fails

Cause:
- Browser binaries are not installed

Fix:

```powershell
npx playwright install chromium
```

### 16.3 Login keeps redirecting to sign-in page

Cause:
- Credentials are wrong
- `TARGET_ENV` does not match provided credentials
- Old saved session is invalid

Fix:

- Check `.env`
- Confirm `TARGET_ENV`
- Delete the related file from `storage/`
- Run the suite again

### 16.4 Application opens but tests fail on element not found

Cause:
- Application UI changed
- Test data no longer matches environment data
- Environment is slow or unstable

Fix:

- Review the failing page object in `pages/`
- Review related feature file and step definition
- Confirm test data under `test-data/`

### 16.5 HTML report does not show latest run

Cause:
- `results/results.json` was not generated correctly

Fix:

- Rerun the suite
- Run `npm run bdd:report`
- Check that `results/results.json` exists

## 17. Notes for Maintainers

- New scenarios should be added in `features/`
- Matching implementations should be added in `step-definitions/`
- Page interactions should stay inside `pages/`
- Shared waits and environment handling should stay in `utils/`
- Login/session lifecycle is handled from `support/hooks.ts`

## 18. Quick Start

If you only want the shortest path to first execution:

```powershell
git clone <your-repository-url>
cd SaphranPlaywrightAutomation
npm install
npx playwright install chromium
```

Open the existing `.env`, update valid credentials if needed, then run:

```powershell
npm run bdd:smoke
```

The execution report will be generated as:

```text
cucumber-report.html
```
