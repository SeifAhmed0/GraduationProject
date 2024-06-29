var express = require('express');
const {userMiddleware,isRepresntor} = require("../../../app/middelware/auth.middelware.js")
const playerInfoIssues=require('../../../app/controlar/Represntor/mange-Issues/PlayerInfoIssues.js')
const router =express.Router()

router.post("/accept/:id",userMiddleware,isRepresntor, playerInfoIssues.acceptPlayerInfo)

router.put("/:id",userMiddleware,isRepresntor, playerInfoIssues.rejectPlayerInfoRequest)

router.get("/:id",userMiddleware,isRepresntor, playerInfoIssues.getSinglePlayerInfoIssue)



module.exports = router