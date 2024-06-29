var express = require('express');
const {userMiddleware,isRepresntor} = require("../../app/middelware/auth.middelware.js")
const mangePlayer=require('../../app/controlar/Represntor/mangePlayer.js')
const multer  = require('multer')
const upload = multer({ dest: 'public/' })
const router =express.Router()

// router.get("/help",userMiddleware,isRepresntor,mangePlayer.enterEmailForAllPlayers)

router.get('/',userMiddleware,isRepresntor, mangePlayer.getallPlayers)

router.get("/Details/:id",userMiddleware,isRepresntor, mangePlayer.getPlayerDetails )

router.get("/:id",userMiddleware,isRepresntor, mangePlayer.getSinglePlayer )

router.post("/",userMiddleware,isRepresntor,upload.single('img'), mangePlayer.addPlayer)

router.put("/:id",userMiddleware,isRepresntor,upload.single('img'), mangePlayer.editPlayer)

router.delete("/:id",userMiddleware,isRepresntor, mangePlayer.deletePlayer)



module.exports = router
