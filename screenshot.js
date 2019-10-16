const puppeteer = require('puppeteer');
const PDFDocument = require('pdfkit');
const fs = require('fs');


function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
(async () => {

  // 1. Launch the browser
  const browser = await puppeteer.launch();

  // 2. Open a new page
  const page = await browser.newPage();

  // 3. Navigate to URL
  await page.goto('https://readymix-pdf-100.appspot.com/?ReceiptNo=100865&FromUser=TEST&FromUserId=1110540&RefReceiptNo=M-00865');

  // 4. Take screenshot
  await page.screenshot({
    path: 'screenshot.png'
  });
  await browser.close();
  // 5. Create a document
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream('output.pdf'));
  doc.image('screenshot.png', 50, 50, {
    width: 595,
    align: 'center',
    valign: 'center'
  });
  doc.end();
})();