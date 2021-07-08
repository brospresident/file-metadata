var express = require('express');
var cors = require('cors');
require('dotenv').config();
const fileRouter = express.Router();
const multer = require('multer');
const upload = multer({dest: './uploads'});

var app = express();

app.use(cors());
// app.use(multer({dest:'./uploads'}).single('upfile'));
app.use('/', fileRouter);
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

fileRouter.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;
  return res.status(200).json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
  
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
