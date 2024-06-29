const util = require("util");
const { connection } = require("../../db/Connection.js");
class mangeAgentsOfMinistryServices {
    static async addAgentsOfMinistry (data) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("INSERT INTO allusers SET?", [data]);
      };
      static async getallUsers () {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from allusers where type = ?", ["agentsOfMinistry"]);
      };
      static async getSingleUserByAdmin (id) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from allusers where type = ? && id = ?", ["agentsOfMinistry",id]);
      };
      static async editAgent (data,id) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("UPDATE allusers SET name = ? , email = ? WHERE allusers.id = ?",[data.name,data.email,id]);
      };
      static async deleteAgent (id) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("delete from allusers where id =?",[id]);
      };
}
module.exports = mangeAgentsOfMinistryServices;