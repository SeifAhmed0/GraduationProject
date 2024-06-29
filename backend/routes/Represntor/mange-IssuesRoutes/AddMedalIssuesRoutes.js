var express = require('express');
const {userMiddleware,isRepresntor} = require("../../../app/middelware/auth.middelware.js")
const AddMedalIssues=require('../../../app/controlar/Represntor/mange-Issues/AddMedalIssues.js')
const router =express.Router()

router.post("/accept/:id",userMiddleware,isRepresntor, AddMedalIssues.acceptRequestAddMadel)

router.put("/:id",userMiddleware,isRepresntor, AddMedalIssues.rejectRequestAddMadel)

router.get("/:id",userMiddleware,isRepresntor, AddMedalIssues.getSingleAddMedelIssue)



module.exports = router