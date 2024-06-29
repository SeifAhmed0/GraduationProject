const requestPlayerService = require("../../../services/player/requestPlayerService.js")
const sharedService = require("../../../services/shared.js");
const mangePlayerServices = require("../../../services/Represntor/mangePlayerServices.js")
const mangechampionshipServices = require("../../../services/Represntor/mangeChampionshipServices.js")
const mangeMedalServices = require("../../../services/Represntor/mangeMedalServices.js")
const helpers = require('../../helper.js');
class requestPlayer {
    static async requestPlayerInfo(req,res){
        try {
            let data = {
                playerName: req.body.playerName,
                birthOfDate: req.body.birthOfDate,
                height: req.body.height,
                weight: req.body.weight,
                associationId: req.user.association,
                club: req.body.club,
                description: req.body.description,
                playerId: req.user.id,
                Status:"inProcess"
            };
            await requestPlayerService.requestToAddInfo(data);
            helpers.resGenerator(res, 200, true, data, "add request")
        } catch (error) {
            helpers.resGenerator(res, 500, false, error.message, "can't add request player info")
        }
    }
    static async getPlayerDetails(req, res) {
        let singlePlayer
        try {
            singlePlayer = await requestPlayerService.getSinglePlayer(req.user.id, req.user.association);
            if (singlePlayer.length <= 0) {
                throw new Error("not users found");
            }
            const data = await requestPlayerService.getPlayerDetails(req.user.id, req.user.association);
            if (data.length <= 0) {
                throw new Error("not found");
            }
            helpers.resGenerator(res, 200, true, data, "singer agent")
        }
        catch (error) {
            if (error.message === "not found") {
                helpers.resGenerator(res, 200, false, singlePlayer, "not found Details");
            } else {
                helpers.resGenerator(res, 500, false, error.message, "player can't be Details");
            }
        }
    }
    static async requestToAddMadel(req, res) {
        let Medal
        try {
            Medal = await mangeMedalServices.checkIfHeWinInThisChampionship(req.user.id, req.user.association, req.body.year, Number(req.body.championshipID));
            if (Medal.length > 0) {
                throw new Error("medal already registered");
            }
            const singlePlayer = await mangePlayerServices.getSinglePlayer(req.user.id, req.user.association);
            const singleChampion = await mangechampionshipServices.getSinglechampionship(req.body.championshipID, req.user.association);
            if (singlePlayer[0].gender != singleChampion[0].gender) {
                throw new Error("the player gender must match the chapion gender");
            }
            if (singlePlayer[0].weight > singleChampion[0].weight && singleChampion[0].weight != null) {
                throw new Error("the player weight must less than or equal the chapion gender");
            }
            const playerYear = (new Date(singlePlayer[0].birthOfDate)).getFullYear()
            if ((singleChampion[0].isYoungs == "true" || singleChampion[0].isYoungs == "1") &&
                singleChampion[0].age != null && (singleChampion[0].age <= (req.body.year - playerYear - 1))) {
                throw new Error("the player age must less than or equal the chapion age");
            }
            let data = {
                MedalAchievementDate: req.body.MedalAchievementDate,
                typeOfMedal: (req.body.isWin == "true" || req.body.isWin == "1") ? req.body.typeOfMedal : "didnotWin",
                playerId: req.user.id,
                championshipID: req.body.championshipID,
                year: req.body.year,
                isWin: (req.body.isWin == "true" || req.body.isWin == "1") ? "true" : req.user.id,
                associationId: req.user.association,
                description: req.body.description,
                typeOfRequest: "add",
                Status:"inProcess"
            };
            await requestPlayerService.requestToAddMadel(data);
            helpers.resGenerator(res, 200, true, data, "add medal")
        } catch (error) {
            if (error.message == "medal already registered") {
                console.log(Medal)
                // const Medal = await mangeMedalServices.checkIfHeWinInThisChampionship(req.body.playerId,req.user.association);
                helpers.resGenerator(res, 400, false, Medal, error.message)
            }
            else if (error.message === "not found") {
                helpers.resGenerator(res, 200, false, singlePlayer, "not found Details");
            }
            else if (error.message == "the player gender must match the chapion gender") {
                helpers.resGenerator(res, 400, false, error.message, 'cannot add medal')
            }
            else if (error.message == "the player weight must less than or equal the chapion gender") {
                helpers.resGenerator(res, 400, false, error.message, 'cannot add medal')
            }
            else if (error.message == "the player age must less than or equal the chapion age") {
                helpers.resGenerator(res, 400, false, error.message, 'cannot add medal')
            }
            else {
                helpers.resGenerator(res, 500, false, error.message, "player can't be requested");
            }
        }
    }
    static async getSingleMedal(req, res) {
        try {
            const data = await requestPlayerService.getSingleMedal(req.params.id, req.user.association);
            if (data.length <= 0) {
                throw new Error("not medal found");
            }
            helpers.resGenerator(res, 200, true, data, "singer medal")
        }
        catch (error) {
            if (error.message == "not medal found") {
                helpers.resGenerator(res, 404, false, error.message, "can't get single medal")
            } else {
                helpers.resGenerator(res, 500, false, error.message, "can't get single medal")
            }
        }
    }
    static async requestToEditMadel(req, res) {
        try {
            console.log(req.params.id);
            const singleMadel = await mangeMedalServices.getSingleMedal(req.params.id, req.user.association);
            if (singleMadel.length <= 0) {
                throw new Error("not Madal found");
            }

            const singlePlayer = await mangePlayerServices.getSinglePlayer(req.user.id, req.user.association);
            const singleChampion = await mangechampionshipServices.getSinglechampionship(Number(req.body.championshipID), req.user.association);
            if (singlePlayer[0].gender != singleChampion[0].gender) {
                throw new Error("the player gender must match the chapion gender");
            }
            if (singlePlayer[0].weight > singleChampion[0].weight && singleChampion[0].weight != null) {
                throw new Error("the player weight must less than or equal the chapion gender");
            }
            const playerYear = (new Date(singlePlayer[0].birthOfDate)).getFullYear()
            if ((singleChampion[0].isYoungs == "true" || singleChampion[0].isYoungs == "1") &&
                singleChampion[0].age != null && (singleChampion[0].age <= (req.body.year - playerYear - 1))) {
                throw new Error("the player age must less than or equal the chapion age");
            }
            let data = {
                MedalAchievementDate: req.body.MedalAchievementDate,
                typeOfMedal: (req.body.isWin == "true" || req.body.isWin == "1") ? req.body.typeOfMedal : "didnotWin",
                playerId: req.user.id,
                championshipID: Number(req.body.championshipID),
                year: req.body.year,
                isWin: (req.body.isWin == "true" || req.body.isWin == "1") ? "true" : req.user.id,
                associationId: req.user.association,
                description: req.body.description,
                IdmedalIfEdit:  req.params.id,
                typeOfRequest: "edit",
                Status:"inProcess"
            };
            await requestPlayerService.requestToeditMadel(data);
            helpers.resGenerator(res, 200, true, data, "add medal")
        } catch (error) {
            if (error.message === "not Madal found") {
                helpers.resGenerator(res, 400, false, error.message, "medal can't be edited");
            }
            else if (error.message == "the player gender must match the chapion gender") {
                helpers.resGenerator(res, 400, false, error.message, 'cannot add medal')
            }
            else if (error.message == "the player weight must less than or equal the chapion gender") {
                helpers.resGenerator(res, 400, false, error.message, 'cannot add medal')
            }
            else if (error.message == "the player age must less than or equal the chapion age") {
                helpers.resGenerator(res, 400, false, error.message, 'cannot add medal')
            }
            else {
                helpers.resGenerator(res, 500, false, error.message, "player can't be requested");
            }
        }
    }
    static async getSinglePlayer(req, res) {
        try {
            const data = await requestPlayerService.getSinglePlayer(req.user.id, req.user.association);
            if (data.length <= 0) {
                throw new Error("not users found");
            }
            helpers.resGenerator(res, 200, true, data, "singer players")
        }
        catch (error) {
            if (error.message == "not users found") {
                helpers.resGenerator(res, 404, false, error.message, "can't get single player")
            } else {
                helpers.resGenerator(res, 500, false, error.message, "can't get single player")
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
}
module.exports = requestPlayer