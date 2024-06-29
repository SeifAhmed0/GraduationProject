const helpers = require("../../../helper");
const playerInfoIssuesService = require("../../../../services/Represntor/mange-IssuesServices/PlayerInfoIssuesServices");
class playerInfoIssues {
    static async getSinglePlayerInfoIssue(req, res) {
        try {
            const data = await playerInfoIssuesService.getSinglePlayerInfoIssue(req.params.id, req.user.association);
            if (data.length <= 0) {
                throw new Error("not issue found");
            }
            const singleMadelWantToCompare = await playerInfoIssuesService.getSinglePlayer(data[0].playerId, req.user.association);
            helpers.resGenerator(res, 200, true, {requestPlayerInfoToCompare:data,singleMadelWantToCompare}, "all issues")
        }
        catch (error) {
            if (error.message == "not issue found") {
                helpers.resGenerator(res, 404, false, error.message, "not issues found")
            }else {
                helpers.resGenerator(res, 500, false, error.message, "can't get all issues")
            }
        }
    }
    static async acceptPlayerInfo(req, res) {
        try {
            const data = await playerInfoIssuesService.getSinglePlayerInfoIssue(req.params.id, req.user.association);
            if (data.length <= 0) {
                throw new Error("not issue found");
            }
            let dataPlayer = {
                name: data[0].playerName,
                birthOfDate: data[0].birthOfDate,
                height: data[0].height,
                weight: data[0].weight,
                associationId: req.user.association,
                club: data[0].club,
            };
            await playerInfoIssuesService.acceptPlayerInfo(dataPlayer,req.params.id,data[0].playerId)
            helpers.resGenerator(res, 200, true, dataPlayer, "Accept request")
        }
        catch (error) {
            if (error.message == "not issue found") {
                helpers.resGenerator(res, 404, false, error.message, "not issues found")
            }else {
                helpers.resGenerator(res, 500, false, error.message, "can't get all issues")
            }
        }
    }
    static async rejectPlayerInfoRequest(req,res) {
        try {
            let data= await playerInfoIssuesService.rejectPlayerInfoRequest(req.params.id)
            helpers.resGenerator(res, 200, true, data, "reject issues")
        } catch (error) {
            helpers.resGenerator(res, 500, false, error.message, "can't reject")
        }
    }
}
module.exports = playerInfoIssues