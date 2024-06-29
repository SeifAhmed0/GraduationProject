const mangechampionshipServices = require("../../../services/Represntor/mangeChampionshipServices.js")
const helpers = require('../../helper.js');
const uploadHandler = require('../../middelware/upload.middleware.js')
const fs = require('fs');
class mangechampionship {
    static async addchampionship(req, res) {
        try{
            const championship = await mangechampionshipServices.checkIfchampionship(req.body.name,req.user.association);
            if (championship.length > 0) {
                throw new Error("championship already registered");
            }
            let data = {
                name: req.body.name,
                gender: req.body.gender,
                weight: (req.body.weight) ? req.body.weight : null,
                associationId: req.user.association,
                typeOfChampionship: req.body.typeOfChampionship,
                isYoungs: (req.body.isYoungs == "true" || req.body.isYoungs == "1") ? true : false,
                age:(req.body.isYoungs == "true" || req.body.isYoungs == "1") ? req.body.age : null,
            };
            await mangechampionshipServices.addchampionship(data);
            helpers.resGenerator(res, 200, true, data, "add championship")
        }
        catch (error) {
            if (error.message =="championship already registered") {
                helpers.resGenerator(res, 400, false, error.message, "can't add championship")
            }else if (error.code === 'ER_DUP_ENTRY') {
                helpers.resGenerator(res, 400, false, 'Duplicate entry error: The record already exists.',"can't add championship");
                // Handle the error appropriately, maybe inform the user or log it
            }else {
                helpers.resGenerator(res, 500, false, error.message, "can't add championship")
            }
        }
    }
    static async getallchampionships(req, res) {
        try {
            const data = await mangechampionshipServices.getallchampionships(req.user.association);
            if (data.length <= 0) {
                throw new Error("not championship found");
            }
            helpers.resGenerator(res, 200, true, data, "all championship")
        }
        catch (error) {
            if (error.message == "not championship found") {
                helpers.resGenerator(res, 404, false, error.message, "not championship found")
            } else {
                helpers.resGenerator(res, 500, false, error.message, "can't get all championship")
            }

        }
    }
    static async getSinglechampionship(req, res) {
        try {
            const data = await mangechampionshipServices.getSinglechampionship(req.params.id, req.user.association);
            if (data.length <= 0) {
                throw new Error("not championship found");
            }
            helpers.resGenerator(res, 200, true, data, "singer championship")
        }
        catch (error) {
            if (error.message == "not championship found") {
                helpers.resGenerator(res, 404, false, error.message, "can't get single championship")
            } else {
                helpers.resGenerator(res, 500, false, error.message, "can't get single championship")
            }
        }
    }
    static async editchampionship(req, res) {
        try {
            const singlePlayer = await mangechampionshipServices.getSinglechampionship(req.params.id, req.user.association);
            if (singlePlayer.length <= 0) {
                throw new Error("not users found");
            }
            const championship = await mangechampionshipServices.checkIfchampionshipNameValied(req.body.name,req.user.association,req.params.id);
            if (championship.length > 0) {
                throw new Error("championship already registered");
            }
            let data = {
                name: req.body.name,
                weight: (req.body.weight) ? req.body.weight : null,
                associationId: req.user.association,
                typeOfChampionship: req.body.typeOfChampionship,
                isYoungs: (req.body.isYoungs == "true" || req.body.isYoungs == "1") ? true : false,
                age:(req.body.isYoungs == "true" || req.body.isYoungs == "1") ? req.body.age : null,
            };
            await mangechampionshipServices.editchampionship(data, req.params.id,req.user.association);
            helpers.resGenerator(res, 200, true, data, "edit user")
        }
        catch (error) {
            if (error.message === "not users found") {
                helpers.resGenerator(res, 400, false, error.message, "championship can't be edited");
            }else if (error.message === "championship already registered") {
                helpers.resGenerator(res, 40, false, error.message, "championship can't be edited");
            }else if (error.code === 'ER_DUP_ENTRY') {
                helpers.resGenerator(res, 400, false, 'Duplicate entry error: The record already exists.',"championship can't be edited");
                // Handle the error appropriately, maybe inform the user or log it
            }else {
                helpers.resGenerator(res, 500, false, error.message, "championship can't be edited");
            }
        }
    }
    static async deletechampionship(req, res) {
        try {
            const singlePlayer = await mangechampionshipServices.getSinglechampionship(req.params.id, req.user.association);
            if (singlePlayer.length <= 0) {
                throw new Error("not championship found");
            }
            await mangechampionshipServices.deletechampionship(req.params.id, req.user.association);
            helpers.resGenerator(res, 200, true, singlePlayer, "delete championship ")
        }
        catch (error) {
            helpers.resGenerator(res, 400, false, error.message, "championship can't be deleted")
        }
    }
}
module.exports = mangechampionship;