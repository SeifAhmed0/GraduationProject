const helpers = require("../../../helper");
const SharedIssuesService = require("../../../../services/Represntor/mange-IssuesServices/SharedIssuesServices");
class SharedIssues{
    static async getAllIssues(req, res){
        try {
            const data = await SharedIssuesService.getAllIssues(req.user.association);
            if (data.length <= 0) {
                throw new Error("not issue found");
            }
            let playerInfoIssues =data[0]
            let requestMedal =data[1]
            helpers.resGenerator(res, 200, true, {playerInfoIssues,requestMedal}, "all issues")
        }
        catch (error) {
            if (error.message == "not issue found") {
                helpers.resGenerator(res, 404, false, error.message, "not issues found")
            } else {
                helpers.resGenerator(res, 500, false, error.message, "can't get all issues")
            }
        }
    }
}
module.exports = SharedIssues