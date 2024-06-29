var express = require('express');
const {userMiddleware,isAgent} = require("../../app/middelware/auth.middelware.js")
const DisplayAssociationInfo=require('../../app/controlar/agent/DisplayAssociationInfo.js')
const router =express.Router()

router.get('/getAllAssociation',userMiddleware,isAgent, DisplayAssociationInfo.getallAssociation)

router.get('/getallMedalInAssociation/:associationId',userMiddleware,isAgent, DisplayAssociationInfo.getallMedalInAssociation)

module.exports = router