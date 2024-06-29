const util = require("util");
const { connection } = require("../../db/Connection.js");
class mangechampionship {
    static async addchampionship(data) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("INSERT INTO championship SET?", [data]);
    };
    static async getallchampionships(associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from championship inner join association on association.associationID=championship.associationId where championship.associationId =? ",[associationId] );
    };
    static async getSinglechampionship(id,associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from championship inner join association on association.associationID=championship.associationId where championship.associationId =? and championship.id =?",[associationId,id]);
    };
    static async checkIfchampionship(name,associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from championship inner join association on association.associationID=championship.associationId where championship.name =? and championship.id =?",[name,associationId]);
    };
    static async checkIfchampionshipNameValied(name,associationId,id) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from championship inner join association on association.associationID=championship.associationId where championship.name =? and championship.id =? and id !=?",[name,associationId,id]);
    };
    static async editchampionship(data, id,associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("UPDATE championship SET ? where id = ? and associationId =?", [data, id, associationId]);
    };
    static async deletechampionship(id, associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("delete from championship where id =? and associationId =?", [id, associationId]);
    };
}
module.exports = mangechampionship;