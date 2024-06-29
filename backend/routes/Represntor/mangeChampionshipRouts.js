var express = require('express');
const {userMiddleware,isRepresntor} = require("../../app/middelware/auth.middelware.js")
const mangechampionship=require('../../app/controlar/Represntor/mangechampionship.js')
const router =express.Router()

router.get('/',userMiddleware,isRepresntor, mangechampionship.getallchampionships)

router.get("/:id",userMiddleware,isRepresntor, mangechampionship.getSinglechampionship )

router.post("/",userMiddleware,isRepresntor, mangechampionship.addchampionship)

router.put("/:id",userMiddleware,isRepresntor, mangechampionship.editchampionship)

router.delete("/:id",userMiddleware,isRepresntor, mangechampionship.deletechampionship)



module.exports = router
