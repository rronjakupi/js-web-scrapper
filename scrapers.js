const puppeteer = require("puppeteer"); // The puppeteer library

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // $x is a puppeteer selector that let's us select and element on the page from xPath

  const [element] = await page.$x('//*[@id="imgBlkFront"]'); // Here we are selecting the image of the product
  const src = await element.getProperty("src");
  const imageUrl = await src.jsonValue(); // Since the src property is not a string we get the string value of src with jsonValue()

  const [element2] = await page.$x('//*[@id="productTitle"]'); // Here we are selecting the title of the product
  const text = await element2.getProperty("textContent");
  const title = await text.jsonValue();

  const [element3] = await page.$x(
    '//*[@id="buyNewSection"]/a/h5/div/div[2]/div/span[2]'
  ); // Here we are selecting the price of the product
  const text2 = await element3.getProperty("textContent");
  const price = await text2.jsonValue();

  console.log({ imageUrl, title, price });

  browser.close();
}

scrapeProduct(
  "https://www.amazon.com/JavaScript-Definitive-Guide-Activate-Guides/dp/0596805527?ref_=Oct_TopRatedC_3617_1&pf_rd_p=f398761c-2e68-5e26-bf7c-55a795bd9588&pf_rd_s=merchandised-search-6&pf_rd_t=101&pf_rd_i=3617&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=XQ1FJPAR901X2TB2CP9A&pf_rd_r=XQ1FJPAR901X2TB2CP9A&pf_rd_p=f398761c-2e68-5e26-bf7c-55a795bd9588"
);
