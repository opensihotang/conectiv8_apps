let multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/HACKTIV8/PHASE-1/PairProject/conectiv8_apps/assets')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})

let upload = multer({ storage: storage });

module.exports = upload