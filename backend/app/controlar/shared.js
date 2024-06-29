const sharedService = require("../../services/shared.js");
const helpers = require('../helper.js');
const modal = require('../../modal-ml/modal.js')
const bcrypt = require("bcrypt");
class shared {
    static async login(req, res) {
        try {
            const findEmail = await sharedService.getEmail(req.body.email)
            if (findEmail[0]) {
                if (await bcrypt.compare(req.body.password, findEmail[0].password)) {
                    await sharedService.genToken(req, findEmail[0].id)
                    findEmail[0].token = req.token
                    helpers.resGenerator(res, 200, true, findEmail[0], "success")
                } else {
                    throw new Error("Invalid password")
                }
            } else {
                throw new Error("Invalid email")
            }


        } catch (error) {
            console.log(error);
            helpers.resGenerator(res, 500, false, error.message, "can't login")
        }
    }
    static async singleLogout(req, res) {
        try {
            await sharedService.singleLogout(req.token)
            helpers.resGenerator(res, 200, true,{}, "success")
        } catch (error) {
            console.log(error);
            helpers.resGenerator(res, 500, false, error.message, "can't log out")
        }
    }
    static async logoutForAll(req, res) {
        try {
            await sharedService.logoutForAll(req.user.id)
            helpers.resGenerator(res, 200, true,{}, "success")
        } catch (error) {
            console.log(error);
            helpers.resGenerator(res, 500, false, error.message, "can't log out")
        }
    }
    static async modal(req, res) {
        try {
            let a= await modal.modalfun(req.body)
            res.status(200).send({a  })
        } catch (error) {
            console.log(error);
            helpers.resGenerator(res, 500, false, error.message, "can't modal")
        }
    }

}
module.exports = shared;