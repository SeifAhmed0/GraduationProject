var express = require('express');
const {userMiddleware,isAgent} = require("../../app/middelware/auth.middelware.js")
const DisplayPlayerInfo=require('../../app/controlar/agent/DisplayPlayerInfo.js')
const router =express.Router()

router.get('/getAllPlayersInSingleInAllProject',userMiddleware,isAgent, DisplayPlayerInfo.getAllPlayersInSingleInAllProject)

router.get('/getAllPlayersInSingleAssociation/:id',userMiddleware,isAgent, DisplayPlayerInfo.getAllPlayersInSingleAssociation)

router.get('/getAllPlayerDetails/:playerId/:associationId',userMiddleware,isAgent, DisplayPlayerInfo.getAllPlayerDetails)

module.exports = router