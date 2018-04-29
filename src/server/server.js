const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
const server = http.createServer(app);

app.use(express.static(config.clientFolderPath));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const indexFilePath = path.join(config.clientFolderPath, 'index.html');
  res.sendFile(indexFilePath);
});

require('./gameserver.js')(server);

server.listen(config.port, () => console.log(`Game server listening on port: ${config.port}`));
