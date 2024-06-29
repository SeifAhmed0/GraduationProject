const util = require("util");
const { connection } = require("../../db/Connection.js");
class mangechampionship {
    static async addMedal(data) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("INSERT INTO medals SET?", [data]);
    };
    static async getallMedal(associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from medals inner join association on association.associationID=medals.associationId where medals.associationId =? ",[associationId] );
    };
    static async getSingleMedal(id,associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from medals inner join association on association.associationID=medals.associationId where medals.associationId =? and medals.id =?",[associationId,id]);
    };
    static async checkIfHeWinInThisChampionship(playerId,associationID,year,championshipId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from medals where associationId =? and year =? and playerId =? and championshipID = ?",[associationID,year,playerId,Number(championshipId)]);
    };
    static async editMedal(data, id,associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("UPDATE medals SET ? where id = ? and associationId =?", [data, id, associationId]);
    };
    static async deleteMedal(id, associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("delete from medals where id =? and associationId =?", [id, associationId]);
    };
}
module.exports = mangechampionship;