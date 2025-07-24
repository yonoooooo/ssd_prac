import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

// ==== ENVIRONMENT SETUP ====

const environment = process.argv[2] || 'local';                 // Get the argument (default to 'local' if not provided)

// URLs based on environment    (As specified in the GitHub Actions workflow)

// Obtain dev selenium server IP using: docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' selenium-server
const seleniumUrl = environment === 'github' 
  ? 'http://selenium:4444/wd/hub'                               // Use the Selenium server IP for GitHub Actions
  : 'http://localhost:4444/wd/hub';                             // Use localhost for local testing

// Note: Start the nodejs server before running the test locally
const serverUrl = environment === 'github' 
  ? 'http://testserver:80'                                      // Changed from 3000 to 80 to match your actual server port
  : 'http://localhost:80';                                      // Use localhost for local testing  


// ==== LOGGING ====
console.log(`Running tests in '${environment}' environment`);
console.log(`Selenium URL: ${seleniumUrl}`);
console.log(`Server URL: ${serverUrl}`);











// Test to check if the login and logout functionality works correctly
async function run() {
  let driver;
  
  if (environment === 'github') {
    // Configure Chrome options for headless mode in GitHub Actions
    const options = new chrome.Options();
    options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
    
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .usingServer(seleniumUrl)  // Use the remote Selenium server
      .build();
  } else {
    // Use local Chrome for development
    driver = await new Builder().forBrowser('chrome').build();
  }

  try {
    await driver.get(serverUrl);  // Use the serverUrl variable instead of hardcoded localhost:80

    await driver.findElement(By.name('password')).sendKeys('Test@1234');
    await driver.findElement(By.css('button[type="submit"]')).click();

    const h1 = await driver.findElement(By.tagName('h1'));
    const h1Text = await h1.getText();

    if (h1Text.trim() === 'Welcome!') {
      console.log('✅ SUCCESS: Welcome page appeared.');

      await driver.findElement(By.css('form[action="/logout"] button')).click();
      await driver.sleep(500); // give time to redirect

      const newH1 = await driver.findElement(By.tagName('h1'));
      const newText = await newH1.getText();

      if (newText.trim() === 'Enter Your Info') {
        console.log('✅ SUCCESS: Logged out and back at form.');
      } else {
        console.error(`❌ FAIL: After logout, got "${newText}"`);
      }
    } else {
      console.error(`❌ FAIL: Expected Welcome!, got "${h1Text}"`);
    }

  } catch (err) {
    console.error('❌ ERROR:', err.message);
  } finally {
    await driver.quit();
  }
}

run();