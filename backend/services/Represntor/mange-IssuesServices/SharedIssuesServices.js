const util = require("util");
const { connection } = require("../../../db/Connection");
class SharedIssuesService{
    static async getAllIssues(associationId) {
        const query = util.promisify(connection.query).bind(connection);
        const queryCode =`
        SELECT * FROM requestPlayerInfo INNER JOIN players ON players.id = requestPlayerInfo.playerId where requestPlayerInfo.associationId=? and Status=? ;
        SELECT * FROM requestMedal INNER JOIN players ON players.id = requestMedal.playerId where requestMedal.associationId=? and Status=?;`
        return await query(queryCode, [associationId,"inProcess",associationId,"inProcess"]);
    };
}
module.exports = SharedIssuesService;