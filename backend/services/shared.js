const util = require("util");
const { connection } = require("../db/Connection.js");
const jwt = require('jsonwebtoken');
class sharedService {
  static async getEmail(email) {
    const query = util.promisify(connection.query).bind(connection);
    return await query("SELECT * FROM allusers WHERE email = ?", [email]);
  };
  static async checkToken(token,decoded) {
    const query = util.promisify(connection.query).bind(connection);
    return await query("SELECT * FROM allusers inner join tokens on allusers.id=tokens.userId  WHERE token = ? && tokenId=?", [token,decoded]);
  };
  static async genToken(req,id) {
    const {nanoid} = await import('nanoid');
    const nId1 = nanoid(10);
    const token = await jwt.sign(nId1,process.env.jwtKey)
    req.token= token
    const query = util.promisify(connection.query).bind(connection);
    return await query("INSERT INTO `tokens` (`token`, `userId`,`tokenId`) VALUES (?, ?, ?)", [token, id, nId1]);
  };
  static async getSingleEmail(email,id) {
    const query = util.promisify(connection.query).bind(connection);
    return await query("SELECT * FROM allusers WHERE email = ? and id != ?", [email,id]);
  };
  static async singleLogout (token) {
    const query = util.promisify(connection.query).bind(connection)
    return await query("delete from tokens where token =?",[token]);
  };
  static async logoutForAll (userId) {
    const query = util.promisify(connection.query).bind(connection)
    return await query("delete from tokens where userId =?",[userId]);
  };
}
module.exports = sharedService;

