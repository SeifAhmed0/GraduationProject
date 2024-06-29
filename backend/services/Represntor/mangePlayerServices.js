const util = require("util");
const { connection } = require("../../db/Connection.js");
class mangeplayer {
    static async addPlayer(dataPlayer,emailPlayer) {
        const query = util.promisify(connection.query).bind(connection);
        const queryString =
            `INSERT INTO players SET ?;
             INSERT INTO allusers SET ?`
        return await query(queryString, [dataPlayer,emailPlayer]);
    };
    static async getallPlayers(associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from players inner join association on association.associationID=players.associationId inner join allusers on allusers.id=players.id where players.associationId =? ", [associationId]);
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
                medals.id AS medalID,
                medals.typeOfMedal,
                medals.year,
                championship.name,
                championship.weight,
                championship.age,
                championship.id AS championID,
                championship.gender As championshipGender,
                championship.isYoungs,
                championship.typeOfChampionship,
                allusers.email AS email 
            FROM 
                players 
            INNER JOIN 
                association ON association.associationID = players.associationId 
            INNER JOIN 
                medals ON medals.playerId = players.id 
            INNER JOIN 
                championship ON medals.championshipID = championship.id
            INNER JOIN 
            allusers ON players.id = allusers.playerId     
            WHERE 
                players.associationId = ? 
                AND 
                players.id = ?
        `;

        return await query(queryString, [associationId, id]);

    };
    static async editPlayer(data, id, associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("UPDATE players SET ? where id = ? and associationId =?", [data, id, associationId]);
    };
    static async deletePlayer(id, associationId) {
        const query = util.promisify(connection.query).bind(connection);
        const quarybox = 
        `delete from players where id =? and associationId =?;
        DELETE FROM allusers WHERE id=?`
        return await query(quarybox, [id, associationId, id]);
    };
    static async getSinglePlayer3(id, associationId) {
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
                allusers.email AS email 
            FROM 
                players 
            INNER JOIN 
                association ON association.associationID = players.associationId 
            INNER JOIN 
            allusers ON players.id = allusers.playerId     
            WHERE 
                players.associationId = ? 
                AND 
                players.id = ?
        `;

        return await query(queryString, [associationId, id]);
    };
    static async deletePlayerMedal(playerId, associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("delete from medals where  playerId =? and associationId =?", [playerId, associationId]);
    }
    // static async addPlayerEmail(data) {
    //     const query = util.promisify(connection.query).bind(connection);
    //     return await query("INSERT INTO allusers SET?", [data]);
    // };
    // static async getallplayeralltime() {
    //     const query = util.promisify(connection.query).bind(connection);
    //     return await query("select name , id, associationId from players ");
    // };

    // static async addallemails(data) {
    //     data.forEach(row => {
    //         const id = row[0];
    //         const email = row[1];
    //         const password = row[2];
    //         const association = row[3];
    //         const name = row[4];
    //         const type = "player";
    //         const sql = "INSERT INTO allusers (id, email, password, type, association, name, playerId) VALUES (?, ?, ?, ?, ?, ?, ?)";
    //         const values = [id, email, password, type, association, name, id];

    //         connection.query(sql, values, function(err, result) {
    //           if (err) throw err;
    //           console.log(err)
    //           console.log(`error start with id: ${id}`);
    //         });
    //       });
    // };
}
module.exports = mangeplayer;