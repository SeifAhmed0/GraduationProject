const util = require("util");
const { connection } = require("../../../db/Connection");
class AddMedalIssuesService {
    static async checkIfHeWinInThisChampionship(playerId,associationID,year,championshipId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from medals where associationId =? and year =? and playerId =? and championshipID = ?",[associationID,year,playerId,Number(championshipId)]);
    };
    static async getSingleAddMedelIssue(requestId,associationID){
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from requestMedal where requestID = ? and typeOfRequest=? and associationId=? and Status='inProcess'",[requestId,"add",associationID]);
    };
    static async checkIfNotAnyoneWinThisMadel(associationID,year,championshipId,typeOfMedal) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from medals where associationId =? and year =? and typeOfMedal =? and championshipID = ?",[associationID,year,typeOfMedal,Number(championshipId)]);
    };
    static async checkIfHeWinInThisChampionship(playerId,associationID,year,championshipId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from medals where associationId =? and year =? and playerId =? and championshipID = ?",[associationID,year,playerId,Number(championshipId)]);
    };
    static async acceptAddMedal(dataMadel, reqId) {
        const query = util.promisify(connection.query).bind(connection);
        const queryBox=`INSERT INTO medals SET?;
                        UPDATE requestMedal SET Status='accept' where requestID = ? and typeOfRequest=? `
        return await query(queryBox, [dataMadel, reqId,"add"]);
    };
    static async rejectAddMadelRequest(reqId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("UPDATE requestMedal SET Status='reject' where requestID = ? and typeOfRequest=?",[reqId,"add"]);
    };
}
module.exports = AddMedalIssuesService;