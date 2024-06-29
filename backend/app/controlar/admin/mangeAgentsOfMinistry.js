
const mangeAgentsOfMinistryServices = require("../../../services/admin/mangeAgentsOfMinistryServices.js")
const sharedService = require("../../../services/shared.js");
const helpers = require('../../helper.js');
const bcrypt = require("bcrypt");
class mangeAgentsOfMinistry {
    static async addAgent(req, res) {
        try {
            const {nanoid} = await import('nanoid');
            const nId1 = nanoid(10);
            const mail = await sharedService.getEmail(req.body.email);
            if (mail.length > 0) {
                throw new Error("Email already registered");
            }
            let data = {
                id: nId1,
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                type: "agentsOfMinistry",
                
            };
            await mangeAgentsOfMinistryServices.addAgentsOfMinistry(data);
            helpers.resGenerator(res,200, true, data, "add user")
        }
        catch (error) {
            if (error.message =="Email already registered") {
                helpers.resGenerator(res,400, false, error.message, "can't add user")
            } else {
                helpers.resGenerator(res,500, false, error.message, "can't add user")
            }
        }
    }
    static async getallusers(req, res){
        try {
            const data = await mangeAgentsOfMinistryServices.getallUsers();
            if (data.length <= 0)  {
                throw new Error("not users found");
            }
            helpers.resGenerator(res,200, true, data, "all users")
        }
        catch (error) {
            if (error.message =="not users found") {
                helpers.resGenerator(res,404, false, error.message, "can't add user")
            } else {
                helpers.resGenerator(res,500, false, error.message, "can't get all users")
            }
            
        }
    }
    static async getSingleUserByAdmin(req, res){
        try {
            const data = await mangeAgentsOfMinistryServices.getSingleUserByAdmin(req.params.id);
            if (data.length <= 0)  {
                throw new Error("not users found");
            }
            helpers.resGenerator(res,200, true, data, "singer agent")
        }
        catch (error) {
            if (error.message =="not users found") {
                helpers.resGenerator(res,404, false, error.message, "can't get single agent")
            } else {
                helpers.resGenerator(res,500, false, error.message, "can't get single agent")
            }
        }
    }
    static async editAgent(req, res) {
        try {
            const mail = await sharedService.getSingleEmail(req.body.email, req.params.id);
            if (mail.length > 0) {
                throw new Error("Email already registered");
            }
            let data = {
                name: req.body.name,
                email: req.body.email,
                // password: await bcrypt.hash(req.body.password, 10),
            };
            await mangeAgentsOfMinistryServices.editAgent(data,req.params.id);
            helpers.resGenerator(res,200, true, data, "edit user")
        }
        catch (error) {
            if (error.message === "Email already registered") {
                helpers.resGenerator(res, 400, false, error.message, "Agent can't be edited");
            } else {
                helpers.resGenerator(res, 500, false, error.message, "Agent can't be edited");
            }
        }
    }
    static async deleteAgent(req, res){
        try {
            const data = await mangeAgentsOfMinistryServices.deleteAgent(req.params.id);
            helpers.resGenerator(res,200, true, data, "delete agent")
        }
        catch (error) {
            helpers.resGenerator(res,400, false, error.message, "Agent can't be deleted")
        }
    }
}
module.exports = mangeAgentsOfMinistry;