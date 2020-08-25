const express = require('express')
const puppeteer = require('puppeteer');
const browser = await puppeteer.launch({args: ['--no-sandbox']});
const app = express()
const port = 3000
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", 'Authorization,Origin,X-Requested-With,Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
const scrape = require('aliexpress-product-scraper');
app.get('/', (req, res) => {
    res.send('working');
})

app.post('/',(req,res) =>{
  console.log(req.body.product_id)
  const product = scrape(req.body.product_id);

  product.then(result => {
    res.json(result);
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



