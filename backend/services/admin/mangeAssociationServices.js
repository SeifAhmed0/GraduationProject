const util = require("util");
const { connection } = require("../../db/Connection.js");
class mangeAssociation {
  static async getAssociationName(associationName) {
    const query = util.promisify(connection.query).bind(connection);
    return await query("SELECT * FROM association WHERE associationName = ?", [associationName]);
  };
  static async addAssociation (associationName) {
    const query = util.promisify(connection.query).bind(connection);
    return await query("INSERT INTO association(associationName)VALUES(?) ", [associationName]);
  };
  static async getallAssociation () {
    const query = util.promisify(connection.query).bind(connection);
    return await query("select * from association ");
  };
  static async editAssociation (associationName,id) {
    const query = util.promisify(connection.query).bind(connection);
    return await query("UPDATE association SET associationName = ? WHERE association.associationID = ?",[associationName,id]);
  };
  static async deleteAssociation (id) {
    const query = util.promisify(connection.query).bind(connection)
    return await query("delete from association where associationID =?",[id]);
  };
  static async getSingleAssociation (id) {
    console.log(typeof id);
    const query = util.promisify(connection.query).bind(connection);
    return await query("SELECT * FROM association WHERE associationID = ?",[Number(id)]);
  };
}
module.exports =mangeAssociation;
