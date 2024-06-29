var express = require('express');
const {userMiddleware,isRepresntor} = require("../../app/middelware/auth.middelware.js")
const mangeMedal=require('../../app/controlar/Represntor/mangeMedal.js')
const router =express.Router()

router.get('/',userMiddleware,isRepresntor, mangeMedal.getallMedal)

router.get("/:id",userMiddleware,isRepresntor, mangeMedal.getSingleMedal )

router.post("/",userMiddleware,isRepresntor, mangeMedal.addMedal)

router.put("/:id",userMiddleware,isRepresntor, mangeMedal.editMedal)

router.delete("/:id",userMiddleware,isRepresntor, mangeMedal.deleteMedal)



module.exports = router
