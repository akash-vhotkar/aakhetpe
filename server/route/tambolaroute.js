const express = require('express');
const router = express.Router();
const tambolacontroller = require('../controller/tambolacontroller');
router.get('/',tambolacontroller().createroom)

module.exports = router;