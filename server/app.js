const express = require('express');
const path = require('path');
const chalk = require('chalk');
const multer = require('multer');

const upload = multer();

class App {
  constructor({ host, port, publicDirectory }) {
    this.PUBLIC = path.resolve(__dirname, publicDirectory);
    this._app = express();
    this._port = port;
    this._host = host;
    this._app.use(express.static(this.PUBLIC));
    this._app.set('json spaces', 2);

    this._app.get('/', (req, res) => {
      res.sendFile(path.join(this.PUBLIC, 'main.html'));
    });

    this._app.post('/getfilesize', upload.single('fileUp'), (req, res) => {
      const { size } = req.file;
      res.json({ size });
    });
  }

  listen() {
    const port = this._app.get('port');
    this._app.listen(this._port, this._host, () => {
      console.log(`${chalk.bgBlue.bold('[SERVER]:')} 🌍  started on  ${this._host}:${this._port}`);
    });
  }
}

module.exports = App;
