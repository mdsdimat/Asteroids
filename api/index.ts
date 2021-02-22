import https from 'https';
import fs from 'fs';
import app from './app';
import sequelize from './dbconn';

const port = process.env.PORT || 9001;
const IS_DEV = process.env.NODE_ENV !== 'production';

const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

(async function () {
  //await sequelize.sync({ force: true });

  if (IS_DEV && key && cert) {
    https
      .createServer({ key, cert }, app)
      .listen(port, () => {
        console.log(`Api is started on https localhost:${port}`);
      });
  } else {
    app.listen(port, () => {
      console.log(`Api is started on localhost:${port}`);
    });
  }
}());
