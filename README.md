# SOFT-311Auto

# E-Commerce Automation Testing Project

This project aims to automate testing for an e-commerce platform using Playwright. It includes automated tests for user login, product management, and checkout processes, ensuring that the functionalities work as intended. 

The project leverages a page object model to organize the test structure and improve maintainability.

## Developers
- Manuel Quesada (mquesadad@ucenfotec.ac.cr)
- Alberto Cañas (acanasb@ucenfotec.ac.cr)

## Requirements
To run this solution, you need to have the following software installed:

- [Node.js (v20.11.0)](https://nodejs.org/en/)
- [Playwright (latest version)](https://playwright.dev/)

## Set up the environment and download dependencies
To set up the project and install the required dependencies, execute the following commands in the solution root directory:

## Install dependencies
```bash
npm install
```

## Running Tests
```bash
npx playwright test
```

## Directory Structure
- **pages/:** Contains page object classes representing different pages of the e-commerce platform (e.g., LoginPage, InventoryPage, CartPage, CheckoutPage).
- **tests/:** Contains test specification files (e.g., login.test.spec.js) that define the test cases using the Playwright test framework.

### Example Test Case
```javascript
test('TC-1 Login with valid credentials', async ({ page }) => {
    await login(page, validUsername, validPassword);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(inventoryPage.isInventoryVisible()).toBeTruthy();
});
```
## Supported Operating Systems
This solution has been tested on the following operating systems:
- [Windows 11 Pro 23H2](https://www.microsoft.com/en-us/software-download/windows11)
- [Mac OS Sonoma 14.2.1](https://www.apple.com/macos/sonoma/)
- [Linux: Playwright Linux setup](https://playwright.dev/docs/intro#system-requirements) (Ensure you install required the dependencies)
- [Node.js (v20.11.0)](https://nodejs.org/en/) (which includes JavaScript)
- [Playwright](https://playwright.dev/) (latest version)
- [Git](https://git-scm.com/) (if cloning the project from a repository)
- Optional: [AQUA IDE](https://www.aquacloud.io/) or [Visual Studio Code](https://code.visualstudio.com/) for development