var express = require('express');
const {userMiddleware,isRepresntor} = require("../../../app/middelware/auth.middelware.js")
const AddMedalIssues=require('../../../app/controlar/Represntor/mange-Issues/EditMedalIssues.js')
const router =express.Router()

router.post("/accept/:id",userMiddleware,isRepresntor, AddMedalIssues.acceptRequestEditMadel)

router.put("/:id",userMiddleware,isRepresntor, AddMedalIssues.rejectRequestEditMadel)

router.get("/:id",userMiddleware,isRepresntor, AddMedalIssues.getSingleEditMedelIssue)



module.exports = router