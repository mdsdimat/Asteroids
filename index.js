const https = require('https');
const fs = require('fs');
const { app } = require('./dist/server.js');

const port = process.env.PORT || 9001;
const IS_DEV = process.env.NODE_ENV !== 'production';

const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

if (IS_DEV && key && cert) {
  https
    .createServer({ key, cert }, app)
    .listen(port, () => {
      console.log(`Application is started on https localhost:${port}`);
    });
  return;
}

app.listen(port, () => {
  console.log(`Application is started on localhost:${port}`);
});
