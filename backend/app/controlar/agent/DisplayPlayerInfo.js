const helpers = require('../../helper.js');
const DisplayPlayerInfoService = require('../../../services/agent/DisplayPlayerInfoService.js');
class displayPlayerInfo{
    static async getAllPlayersInSingleInAllProject(req,res){
        try {
            const data = await DisplayPlayerInfoService.getallPlayersInAllProject();
            if (data.length <= 0) {
                throw new Error("not player found");
            }
            helpers.resGenerator(res, 200, true, data, "all players")
        }
        catch (error) {
            if (error.message == "not player found") {
                helpers.resGenerator(res, 404, false, error.message, "not players found")
            } else {
                helpers.resGenerator(res, 500, false, error.message, "can't get all players")
            }

        }
    }
    static async getAllPlayersInSingleAssociation(req,res){
        try {
            const data = await DisplayPlayerInfoService.getallPlayers(req.params.id);
            if (data.length <= 0) {
                throw new Error("not player found");
            }
            helpers.resGenerator(res, 200, true, data, "all players")
        }
        catch (error) {
            if (error.message == "not player found") {
                helpers.resGenerator(res, 404, false, error.message, "not players found")
            } else {
                helpers.resGenerator(res, 500, false, error.message, "can't get all players")
            }

        }
    }
    static async getAllPlayerDetails(req,res){
        let singlePlayer
        try {
            singlePlayer = await DisplayPlayerInfoService.getSinglePlayer(req.params.playerId, req.params.associationId);
            if (singlePlayer.length <= 0) {
                throw new Error("not users found");
            }
            const data = await DisplayPlayerInfoService.getPlayerDetails(req.params.playerId, req.params.associationId);
            if (data.length <= 0)  {
                throw new Error("not found");
            }
            helpers.resGenerator(res,200, true, data, "singer agent")
        }
        catch (error) {
            if (error.message === "not found") {
                helpers.resGenerator(res, 200, false, singlePlayer, "not found Details");
            } else {
                helpers.resGenerator(res, 500, false, error.message, "player can't be Details");
            }
        }
    }
}
module.exports = displayPlayerInfo;