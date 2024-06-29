const util = require("util");
const { connection } = require("../../db/Connection.js");
class DisplayAssociationInfoService {
    static async getallAssociation () {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from association ");
      };
      static async getallMedalInAssociation(associationId) {
        const query = util.promisify(connection.query).bind(connection);
        return await query("select * from medals inner join association on association.associationID=medals.associationId where medals.associationId =? ",[associationId] );
    };
}
module.exports = DisplayAssociationInfoService;