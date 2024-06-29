
const mangeRepresentorOfAssociationServices = require("../../../services/admin/mangeRepresentorOfAssociationServices.js")
const mangeAssociation = require("../../../services/admin/mangeAssociationServices.js")
const sharedService = require("../../../services/shared.js");
const helpers = require('../../helper.js');
const bcrypt = require("bcrypt");
class mangeRepresentorOfAssociation {
    static async addRepresentorOfAssociation(req, res) {
        try {
            const {nanoid} = await import('nanoid');
            const nId1 = nanoid(10);
            const mail = await sharedService.getEmail(req.body.email);
            if (mail.length > 0) {
                throw new Error("Email already registered");
            }
            const associationId = await mangeAssociation.getAssociationName(req.body.association);
            if (associationId.length < 0) {
                throw new Error("associationId not found");
            }
            let data = {
                id: nId1,
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                type: "representorOfAssociation",
                association:associationId[0].associationID                
            };
            await mangeRepresentorOfAssociationServices.addRepresentorOfAssociation(data);
            helpers.resGenerator(res,200, true, data, "add user")
        }
        catch (error) {
            helpers.resGenerator(res,400, false, error.message, "can't add user")
        }
    }
    static async getallUsers(req, res){
        try {
            const data = await mangeRepresentorOfAssociationServices.getallUsers();
            if (data.length <= 0)  {
                throw new Error("not users found");
            }
            helpers.resGenerator(res,200, true, data, "all users")
        }
        catch (error) {
            helpers.resGenerator(res,400, false, error.message, "can't get all users")
        }
    }
    static async getSingleUserByAdmin(req, res){
        try {
            const data = await mangeRepresentorOfAssociationServices.getSingleUserByAdmin(req.params.id);
            if (data.length <= 0)  {
                throw new Error("not users found");
            }
            helpers.resGenerator(res,200, true, data, "singer agent")
        }
        catch (error) {
            helpers.resGenerator(res,400, false, error.message, "can't get single agent")
        }
    }
    static async getallUsersInSingleAssociation(req, res){
        try {
            console.log(req.params.associationName);
            const data = await mangeRepresentorOfAssociationServices.getallUsersInSingleAssociation(req.params.associationName);
            if (data.length <= 0)  {
                throw new Error("not users found");
            }
            helpers.resGenerator(res,200, true, data, "singer agent")
        }
        catch (error) {
            helpers.resGenerator(res,400, false, error.message, "can't get single agent")
        }
    }
    static async editRepresentor(req, res) {
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
            await mangeRepresentorOfAssociationServices.editRepresentor(data,req.params.id);
            helpers.resGenerator(res,200, true, data, "edit user")
        }
        catch (error) {
            helpers.resGenerator(res,400, false, error.message, "Agent can't be edited")
        }
    }
    static async deleteRepresentor(req, res){
        try {
            const data = await mangeRepresentorOfAssociationServices.deleteRepresentor(req.params.id);
            helpers.resGenerator(res,200, true, data, "delete agent")
        }
        catch (error) {
            helpers.resGenerator(res,400, false, error.message, "Agent can't be deleted")
        }
    }
}
module.exports = mangeRepresentorOfAssociation;