var express = require('express');
const {userMiddleware,isAdmin} = require("../../app/middelware/auth.middelware.js")
const mangeAssociation=require('../../app/controlar/admin/mangeAssociation.js')
const router =express.Router()

router.get('/',userMiddleware,isAdmin, mangeAssociation.getallAssociation)

router.get("/:id",userMiddleware,isAdmin, mangeAssociation.getSingleAssociation )

router.post("/",userMiddleware,isAdmin, mangeAssociation.addAssociation)

router.put("/:id",userMiddleware,isAdmin, mangeAssociation.editAssociation)

router.delete("/:id",userMiddleware,isAdmin, mangeAssociation.deleteAssociation)



module.exports = router
