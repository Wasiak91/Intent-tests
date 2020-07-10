const puppeteer = require('puppeteer');
const { percySnapshot } = require('@percy/puppeteer');
const platform = require('os').platform();
// We need to change the args passed to puppeteer based on the platform they're using
const puppeteerArgs = /^win/.test(platform) ? [] : ['--single-process'];
const MAIN_URL = `https://withintent.com`;
const SERVICES_URL = `https://withintent.com/services`
const ABOUT_URL = `https://withintent.com/about`
const CONTACT_URL = `https://withintent.com/contact`

describe('withintent', function() {
  this.timeout(6000);
  let page;
  let server;
  let browser;
  let frame;  

  before(async () => {
    browser = await puppeteer.launch({
      headless: true,
      timeout: 10000,
      args: puppeteerArgs
    });
  });

  afterEach(function() {
    page.close();
  });

  const initpage = async (url) => {
    page = await browser.newPage();
    await page.goto(url);
    await page.evaluate(() => localStorage.clear());
    frame = await page.frames().find(item => item._name === "mtm-frame-prompt");
    const abc = await frame.$(".Button-hr1vw8-0.gwvPnG");
    abc.click() 
  }

  it('Loads the main page', async function() {     
    await initpage (MAIN_URL)
    await percySnapshot(page, this.test.fullTitle(), { widths: [360, 768, 1440] });
    
  });  
  
  it('Loads the services page', async function() {     
    await initpage (SERVICES_URL)
    await percySnapshot(page, this.test.fullTitle(), { widths: [360, 768, 1440] });
  });

  it('Loads the about page', async function() {     
    await initpage (ABOUT_URL)
    await percySnapshot(page, this.test.fullTitle(), { widths: [360, 768, 1440] });
  });

  it('Loads the contact page', async function() {     
    await initpage (CONTACT_URL)
    await percySnapshot(page, this.test.fullTitle(), { widths: [360, 768, 1440] });
  });
});
