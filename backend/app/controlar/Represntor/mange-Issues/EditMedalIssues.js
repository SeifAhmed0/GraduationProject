const helpers = require("../../../helper");
const editMedalIssuesService = require("../../../../services/Represntor/mange-IssuesServices/EditMedalIssuesServices");
class EditMedalIssues {
    static async getSingleEditMedelIssue(req, res) {
        let Medal,data
        try {
            data = await editMedalIssuesService.getSingleEditMedelIssue(req.params.id, req.user.association);
            if (data.length <= 0) {
                throw new Error("not issue found");
            }
            if (data[0].typeOfMedal != 'didnotWin') {
                Medal = await editMedalIssuesService.checkIfNotAnyoneWinThisMadel(req.user.association, data[0].year, Number(data[0].championshipID), data[0].typeOfMedal);
                if (Medal.length > 0) {
                    console.log(Medal[0]);
                    throw new Error("medal already registered");
                }
            }
            const singleMadelWantToCompare = await editMedalIssuesService.getSingleMedal(data[0].IdmedalIfEdit, req.user.association);
            helpers.resGenerator(res, 200, true, {requestmadelToCompare:data,singleMadelWantToCompare}, "all issues")
        }
        catch (error) {
            if (error.message == "not issue found") {
                helpers.resGenerator(res, 404, false, error.message, "not issues found")
            }else if (error.message == "medal already registered") {
                helpers.resGenerator(res, 400, false, {medalAlreadyRejecter:Medal[0],requestedMadel:data}, "medal already registered")
            }else {
                helpers.resGenerator(res, 500, false, error.message, "can't get all issues")
            }
        }
    }
    static async acceptRequestEditMadel(req, res) {
        let Medal,heMedal
        try {
            const data = await editMedalIssuesService.getSingleEditMedelIssue(req.params.id, req.user.association);
            if (data.length <= 0) {
                throw new Error("not issue found");
            }
            heMedal = await editMedalIssuesService.checkIfHeWinInThisChampionship(data[0].playerId, data[0].associationId, data[0].year, Number(data[0].championshipID));
            if (heMedal.length > 0) {
                throw new Error("the medal is store to him");
            }
            if (data[0].typeOfMedal != 'didnotWin') {
                Medal = await editMedalIssuesService.checkIfNotAnyoneWinThisMadel(req.user.association, data[0].year, Number(data[0].championshipID), data[0].typeOfMedal);
                if (Medal.length > 0) {
                    console.log(Medal[0]);
                    throw new Error("medal already registered");
                }
            }
            console.log(data);
            const { nanoid } = await import('nanoid');
            const nId1 = nanoid(10);
            let dataMadel = {
                id: data[0].IdmedalIfEdit,
                MedalAchievementDate: data[0].MedalAchievementDate,
                typeOfMedal: (data[0].isWin == "true" || data[0].isWin == "1") ? data[0].typeOfMedal : "didnotWin",
                playerId: data[0].playerId,
                championshipID: Number(data[0].championshipID),
                year: data[0].year,
                isWin: (data[0].isWin == "true" || data[0].isWin == "1") ? "yes" : data[0].playerId,
                associationId: req.user.association
            };
            await editMedalIssuesService.acceptEditMedal(dataMadel,req.params.id,data[0].IdmedalIfEdit)
            helpers.resGenerator(res, 200, true, dataMadel, "Accept request")
        }
        catch (error) {
            if (error.message == "not issue found") {
                helpers.resGenerator(res, 404, false, error.message, "not issues found")
            }else if (error.message == "the medal is store to him") {
                helpers.resGenerator(res, 400, false, heMedal[0], "the medal is store to him")
            }else if (error.message == "medal already registered") {
                helpers.resGenerator(res, 400, false, Medal[0], "medal already registered")
            } else {
                helpers.resGenerator(res, 500, false, error.message, "can't get all issues")
            }
        }
    }
    static async rejectRequestEditMadel(req,res) {
        try {
            let data= await editMedalIssuesService.rejectEditMadelRequest(req.params.id)
            helpers.resGenerator(res, 200, true, data, "reject issues")
        } catch (error) {
            helpers.resGenerator(res, 500, false, error.message, "can't reject")
        }
    }
}
module.exports = EditMedalIssues