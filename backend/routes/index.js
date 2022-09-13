var express = require('express');
var router = express.Router();
var coreRouter = require('../core/Core');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/send', coreRouter.sendBitcoin);
router.post('/create', coreRouter.createWallet);
router.post('/open', coreRouter.openWallet)
module.exports = router;
