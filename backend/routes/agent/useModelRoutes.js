var express = require('express');
const {userMiddleware,isAgent} = require("../../app/middelware/auth.middelware.js")
const useModelRoutes=require('../../app/controlar/agent/useModel.js')
const router =express.Router()

router.post('/',userMiddleware,isAgent, useModelRoutes.genModel)

module.exports = router