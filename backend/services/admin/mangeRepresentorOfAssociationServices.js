const util = require("util");
const { connection } = require("../../db/Connection.js");
class mangeAgentsOfMinistryServices {
    static async addRepresentorOfAssociation(data) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("INSERT INTO allusers SET?", [data]);
    };
    static async getallUsers() {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from allusers inner join association on associationID=allusers.association where type = ?", ["representorOfAssociation"]);
    };
    static async getallUsersInSingleAssociation(associationName) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from allusers inner join association on associationID=allusers.association where type = ? && associationName = ?", ["representorOfAssociation",associationName]);
    };
    static async getSingleUserByAdmin(id) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from allusers inner join association on associationID=allusers.association where type = ? && id = ?", ["representorOfAssociation", id]);
    };
    static async editRepresentor(data, id) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("UPDATE allusers SET name = ? , email = ? WHERE allusers.id = ?", [data.name, data.email, id]);
    };
    static async deleteRepresentor(id) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("delete from allusers where id =?", [id]);
    };
}
module.exports = mangeAgentsOfMinistryServices;