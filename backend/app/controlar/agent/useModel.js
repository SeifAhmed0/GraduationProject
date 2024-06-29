const axios = require('axios');
const helpers = require('../../helper.js');
const useModalService = require('../../../services/agent/useModalService.js')
class useModel {

    static async genModel(req, res) {
        try {
            const playersIds = req.body.playersIDs
            const getAllPlayerById = await useModalService.getInfo(req.body.associationId, playersIds)
            const lastFiveYearsPlayerInfo = getAllPlayerById[0]

            const allPlayersInfo = getAllPlayerById[1]

            const players = getAllPlayerById[2]

            let dataToSend = {
                "features": []
            }
            let allPlayersMadalforever = []
            let allPlayersMadalLast5Years = []
                
            let singlePlayerInfo
            playersIds.forEach(element => {
                console.log(element);
                let allMedalsNumber = 0
                let NumberOfGoldMedal = 0
                let object1 = []
                lastFiveYearsPlayerInfo.forEach(item => {
                    if (element == item.playerId) {
                        if (item.isWin == "yes") {
                            allMedalsNumber++
                            if (item.typeOfMedal == 'gold') {
                                NumberOfGoldMedal++
                            }
                        }
                        object1.push(item)
                    }
                });
                allPlayersMadalLast5Years.push(object1)
                singlePlayerInfo = {
                    "id": element,
                    "values": [NumberOfGoldMedal, allMedalsNumber]
                }
                dataToSend.features.push(singlePlayerInfo)
            });
            playersIds.forEach(element => {
                let object2 = []
                allPlayersInfo.forEach(item => {
                    if (element == item.playerId) {
                        object2.push(item)
                    }
                });
                allPlayersMadalforever.push(object2)
            });


            const response = await axios.post('http://localhost:4000/predict', dataToSend);

            // 18>>>1.8 21>>>1.6 24>>>1.40 27>>>1.25 30 >>> 1.15 

            helpers.resGenerator(res, 200, true, { perdiction: response.data, allPlayersMadalforever, players, allPlayersMadalLast5Years }, "all models"); // Use response.data to get the actual data
            // helpers.resGenerator(res, 200, true, { lastFiveYearsPlayerInfo, allPlayersInfo, players }, "all models"); // Use response.data to get the actual data
        } catch (error) {
            // Extract relevant error information
            const errorMessage = error.response ? error.response.data : error.message;
            helpers.resGenerator(res, 500, false, errorMessage, "can't get all players");
        }
    }
}

module.exports = useModel;
