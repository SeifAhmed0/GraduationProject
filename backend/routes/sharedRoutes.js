var express = require('express');
const {userMiddleware} = require("../app/middelware/auth.middelware.js")
const shared = require('../app/controlar/shared.js')
const router =express.Router()
router.post("/login", shared.login)
router.delete("/singleLogout",userMiddleware, shared.singleLogout)
router.delete("/allLogout",userMiddleware, shared.logoutForAll)
router.post("/predict",shared.modal)
module.exports = router