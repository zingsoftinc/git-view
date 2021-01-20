import express from 'express';
import path from 'path';
const app = express();
const port = 8080;
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules/')));
app.use('/', express.static(path.join(__dirname, '../src/')));

app.get('/', (req,res) => {
  res.sendFile(path.resolve(__dirname, './runner.html'));
});

app.listen(port, (req, res) => {
  console.log(`Server listening at localhost:${port}`);
});
