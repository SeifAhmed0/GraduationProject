var express = require('express');
const {userMiddleware,isRepresntor} = require("../../../app/middelware/auth.middelware.js")
const SharedIssuesRoutes=require('../../../app/controlar/Represntor/mange-Issues/SharedIssues.js')
const router =express.Router()

router.get("/",userMiddleware,isRepresntor, SharedIssuesRoutes.getAllIssues)

module.exports = router