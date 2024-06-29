const util = require("util");
const { connection } = require("../../../db/Connection");
class AddMedalIssuesService {
    static async getSinglePlayerInfoIssue(requestId,associationID){
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from requestPlayerInfo where requestID = ? and associationId=? and Status=?",[requestId,associationID,"inProcess"]);
    };
    static async getSinglePlayer(id, associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from players inner join association on association.associationID=players.associationId where players.associationId =? and players.id =?", [associationId, id]);
    };
    static async acceptPlayerInfo(dataPlayer, reqId, playerId) {
        const query = util.promisify(connection.query).bind(connection);
        const queryBox=`UPDATE players SET? where players.id =?;
                        UPDATE requestPlayerInfo SET Status='accept' where requestID = ?  `
        return await query(queryBox, [dataPlayer,playerId, reqId]);
    };
    static async rejectPlayerInfoRequest(reqId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("UPDATE requestPlayerInfo SET Status='reject' where requestID = ? ",[reqId]);
    };
}
module.exports = AddMedalIssuesService;