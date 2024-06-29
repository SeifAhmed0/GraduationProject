const helpers = require('../../helper.js');
const DisplayAssociationInfoService = require('../../../services/agent/DisplayAssociationInfoService.js');
class DisplayAssociationInfo{
    static async getallAssociation(req, res){
        try {
            const data = await DisplayAssociationInfoService.getallAssociation();
            if (data.length <= 0)  {
                throw new Error("not association found");
            }
            helpers.resGenerator(res,200, true, data, "all association")
        }
        catch (error) {
            helpers.resGenerator(res,400, false, error.message, "can't get all association")
        }
    }
    static async getallMedalInAssociation(req, res) {
        try {
            const data = await DisplayAssociationInfoService.getallMedalInAssociation(req.params.associationId);
            if (data.length <= 0) {
                throw new Error("not medal found");
            }
            helpers.resGenerator(res, 200, true, data, "all medal")
        }
        catch (error) {
            if (error.message == "not medal found") {
                helpers.resGenerator(res, 404, false, error.message, "not medal found")
            } else {
                helpers.resGenerator(res, 500, false, error.message, "can't get all medal")
            }

        }
    }
}
module.exports = DisplayAssociationInfo;