
const mangeAssociationservices = require("../../../services/admin/mangeAssociationServices.js")
const helpers = require('../../helper.js');
class mangeAssociation {
    static async addAssociation(req, res) {
        try {
            await mangeAssociationservices.addAssociation(req.body.associationName);
            helpers.resGenerator(res, 200, true, {}, "add association")
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                helpers.resGenerator(res, 400, false, 'Duplicate entry error: The record already exists.', 'cannot add association');
                // Handle the error appropriately, maybe inform the user or log it
            } else {
                helpers.resGenerator(res, 400, false, error.message, "can't add association")
            }
        }
    }
    static async getallAssociation(req, res) {
        try {
            const data = await mangeAssociationservices.getallAssociation();
            if (data.length <= 0) {
                throw new Error("not association found");
            }
            helpers.resGenerator(res, 200, true, data, "all association")
        }
        catch (error) {
            helpers.resGenerator(res, 400, false, error.message, "can't get all association")
        }
    }
    static async getSingleAssociation(req, res) {
        try {
            const data = await mangeAssociationservices.getSingleAssociation(req.params.id);
            if (data.length <= 0) {
                throw new Error("not association found");
            }
            helpers.resGenerator(res, 200, true, data, "singer association")
        }
        catch (error) {
            helpers.resGenerator(res, 400, false, error.message, "can't get single association")
        }
    }
    static async editAssociation(req, res) {
        try {
            await mangeAssociationservices.editAssociation(req.body.associationName, req.params.id);
            helpers.resGenerator(res, 200, true, {}, "edit association")
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                helpers.resGenerator(res, 400, false, 'Duplicate entry error: The record already exists.',"association can't be edited");
                // Handle the error appropriately, maybe inform the user or log it
            }
            else{
            helpers.resGenerator(res, 400, false, error.message, "association can't be edited")
        }}
    }
    static async deleteAssociation(req, res) {
        try {
            const data = await mangeAssociationservices.deleteAssociation(req.params.id);
            helpers.resGenerator(res, 200, true, data, "delete association")
        }
        catch (error) {
            helpers.resGenerator(res, 400, false, error.message, "association can't be deleted")
        }
    }
}
module.exports = mangeAssociation;