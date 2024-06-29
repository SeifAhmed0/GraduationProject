const util = require("util");
const { connection } = require("../../db/Connection.js");
class useModalService {
    static async getInfo (associationId,playerIds) {
        const placeholders = playerIds.map(() => '?').join(',');
        const lastFiveYears = new Date().getFullYear()-5;
        console.log(playerIds);
        const query = util.promisify(connection.query).bind(connection);
        const queryBox = `SELECT 
        players.name As playerName,
        medals.id, medals.MedalAchievementDate,
        medals.typeOfMedal,
        medals.playerId,
        medals.championshipID,
        medals.associationId,
        medals.year,
        medals.isWin FROM medals
        INNER JOIN 
            players ON players.id = medals.playerId
        WHERE medals.associationId = ? AND medals.year >= ? AND medals.playerId IN (${placeholders});
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
                AND playerId IN (${placeholders});
                select * from players where id IN (${placeholders})  
        `;
        
        return await query(queryBox, [associationId, lastFiveYears, ...playerIds,associationId, ...playerIds,...playerIds]);
      };
      static async getallMedalInAssociation(associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from medals inner join association on association.associationID=medals.associationId where medals.associationId =? ",[associationId] );
    };
}
module.exports = useModalService;