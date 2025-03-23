# Playwright E2E Testing

This repository contains end-to-end tests using Playwright framework.

## Installation

1. Clone the repository:

   ```bash
   git clone <this repository URL>
   cd playwright
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install --with-deps chromium
   ```

## Running Tests

To run all tests defined in your Playwright configuration:

```bash
npx playwright test
```

To run tests in a specific browser, you will need to change it in playwright cinfig.

To run tests in UI mode:

```bash
npx playwright test --ui
```

# See report

To see report when tests are finished run:

```bash
npx playwright show-report
```

## GitHub Actions Workflow

This project includes a GitHub Actions workflow for running E2E tests on every push:

- The workflow runs on Ubuntu
- Tests are executed using the Chromium browser
- Test reports are uploaded as artifacts and retained for 14 days

### Viewing Test Reports

After a GitHub Actions run completes, you can view test reports by:

1. Going to the GitHub Actions tab
2. Selecting the completed workflow run
3. Downloading the "playwright-report-chromium" artifact
4. Extracting and opening the HTML report in a browser

## Troubleshooting

If you encounter the error "Cannot use --browser option when configuration file defines projects", make sure your test command doesn't include the `--browser` flag, as it's incompatible with projects defined in the configuration file.

## Documentation

For more information about Playwright, see the [official documentation](https://playwright.dev/docs/intro).
