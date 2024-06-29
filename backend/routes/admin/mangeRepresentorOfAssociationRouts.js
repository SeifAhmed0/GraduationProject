var express = require('express');
const {userMiddleware,isAdmin} = require("../../app/middelware/auth.middelware")
const mangeRepresentorOfAssociation=require('../../app/controlar/admin/mangeRepresentorOfAssociation.js')
const router =express.Router()

router.get('/',userMiddleware,isAdmin, mangeRepresentorOfAssociation.getallUsers)

router.get("/associationMember/:associationName",userMiddleware,isAdmin, mangeRepresentorOfAssociation.getallUsersInSingleAssociation )

router.get("/:id",userMiddleware,isAdmin, mangeRepresentorOfAssociation.getSingleUserByAdmin )

router.post("/",userMiddleware,isAdmin, mangeRepresentorOfAssociation.addRepresentorOfAssociation)

router.put("/:id",userMiddleware,isAdmin, mangeRepresentorOfAssociation.editRepresentor)

router.delete("/:id",userMiddleware,isAdmin, mangeRepresentorOfAssociation.deleteRepresentor)



module.exports = router
