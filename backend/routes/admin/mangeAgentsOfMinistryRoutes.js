var express = require('express');
const {userMiddleware,isAdmin} = require("../../app/middelware/auth.middelware")
const mangeAgentsOfMinistry=require('../../app/controlar/admin/mangeAgentsOfMinistry.js')
const router =express.Router()

router.get('/',userMiddleware,isAdmin, mangeAgentsOfMinistry.getallusers)

router.get("/:id",userMiddleware,isAdmin, mangeAgentsOfMinistry.getSingleUserByAdmin )

router.post("/",userMiddleware,isAdmin, mangeAgentsOfMinistry.addAgent)

router.put("/:id",userMiddleware,isAdmin, mangeAgentsOfMinistry.editAgent)

router.delete("/:id",userMiddleware,isAdmin, mangeAgentsOfMinistry.deleteAgent)



module.exports = router
