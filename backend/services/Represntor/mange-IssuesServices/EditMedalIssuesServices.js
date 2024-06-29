const util = require("util");
const { connection } = require("../../../db/Connection");
class AddMedalIssuesService {
    static async checkIfHeWinInThisChampionship(playerId,associationID,year,championshipId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from medals where associationId =? and year =? and playerId =? and championshipID = ?",[associationID,year,playerId,Number(championshipId)]);
    };
    static async getSingleEditMedelIssue(requestId,associationID){
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from requestMedal where requestID = ? and typeOfRequest=? and associationId=? and Status=?",[requestId,"edit",associationID,"inProcess"]);
    };
    static async getSingleMedal(id,associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from medals inner join association on association.associationID=medals.associationId where medals.associationId =? and medals.id =?",[associationId,id]);
    };
    static async checkIfNotAnyoneWinThisMadel(associationID,year,championshipId,typeOfMedal) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from medals where associationId =? and year =? and typeOfMedal =? and championshipID = ?",[associationID,year,typeOfMedal,Number(championshipId)]);
    };
    static async checkIfHeWinInThisChampionship(playerId,associationID,year,championshipId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from medals where associationId =? and year =? and playerId =? and championshipID = ?",[associationID,year,playerId,Number(championshipId)]);
    };
    static async acceptEditMedal(dataMadel, reqId, madelId) {
        const query = util.promisify(connection.query).bind(connection);
        const queryBox=`UPDATE medals SET? where medals.id =?;
                        UPDATE requestMedal SET Status='accept' where requestID = ? and typeOfRequest=? `
        return await query(queryBox, [dataMadel,madelId, reqId, "edit"]);
    };
    static async rejectEditMadelRequest(reqId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("UPDATE requestMedal SET Status='reject' where requestID = ? and typeOfRequest=?",[reqId,"edit"]);
    };
}
module.exports = AddMedalIssuesService;