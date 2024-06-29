const util = require("util");
const { connection } = require("../../db/Connection.js");
class requestPlayerService {
    static async getSinglePlayer(id, associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from players inner join association on association.associationID=players.associationId where players.associationId =? and players.id =?", [associationId, id]);
    };
    static async requestToAddInfo(data) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("INSERT INTO requestPlayerInfo SET?", [data]);
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
            medals.id AS medalID,
            medals.MedalAchievementDate,
            medals.typeOfMedal,
            medals.year,
            championship.name,
            championship.weight,
            championship.age,
            championship.gender As championshipGender,
            championship.isYoungs,
            championship.typeOfChampionship 
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
    static async requestToAddMadel(data) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("INSERT INTO requestMedal SET?", [data]);
    };
    static async requestToeditMadel(data) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("INSERT INTO requestMedal SET?", [data]);
    };
    static async getSingleMedal(id, associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from medals inner join association on association.associationID=medals.associationId where medals.associationId =? and medals.id =?", [associationId, id]);
    };
    static async getSinglePlayer(id, associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from players inner join association on association.associationID=players.associationId where players.associationId =? and players.id =?", [associationId, id]);
    };
}
module.exports = requestPlayerService;
