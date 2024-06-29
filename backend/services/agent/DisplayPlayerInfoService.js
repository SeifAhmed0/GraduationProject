const util = require("util");
const { connection } = require("../../db/Connection.js");
class DisplayPlayerInfoService {
    static async getallPlayersInAllProject() {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from players inner join association on association.associationID=players.associationId ");
    };
    static async getallPlayers(associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from players inner join association on association.associationID=players.associationId where players.associationId =? ", [associationId]);
    };
    static async getSinglePlayer(id, associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from players inner join association on association.associationID=players.associationId where players.associationId =? and players.id =?", [associationId, id]);
    };
    static async getPlayerDetails(id, associationId) {
        const query = util.promisify(connection.query).bind(connection);
        const queryString = `
            SELECT 
                players.id AS playerId,
                players.name As playerName,
                players.birthOfDate,
                players.gender As playerGender,
                players.height,
                players.img,
                players.club,
                association.associationName,
                medals.MedalAchievementDate,
                medals.typeOfMedal,
                medals.year,
                championship.name,
                championship.weight,
                championship.age,
                championship.gender As championshipGender,
                championship.isYoungs,
                championship.typeOfChampionship,
                championship.id As championID,
                medals.isWin
            FROM 
                players 
            INNER JOIN 
                association ON association.associationID = players.associationId 
            INNER JOIN 
                medals ON medals.playerId = players.id 
            INNER JOIN 
                championship ON medals.championshipID = championship.id 
            WHERE 
                players.associationId = ? 
                AND 
                players.id = ?
        `;

        return await query(queryString, [associationId, id]);

    };
}
module.exports = DisplayPlayerInfoService;