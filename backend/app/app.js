
require("../db/Connection")
const path =require("path")
const express =require("express")
const app =express()
const cors =require("cors")
var bodyParser = require('body-parser')
const sharedRoutes = require('../routes/sharedRoutes')
const mangeAgentsOfMinistryRoutes = require('../routes/admin/mangeAgentsOfMinistryRoutes')
const mangeRepresentorOfAssociation = require('../routes/admin/mangeRepresentorOfAssociationRouts')
const mangeAssociationRoutes = require('../routes/admin/mangeAssociationRouts')
const mangePlayerRoutes = require('../routes/Represntor/mangePlayerRouts')
const mangeChampionshipRouts = require('../routes/Represntor/mangeChampionshipRouts')
const mangeMedalRouts = require('../routes/Represntor/mangeMedalRouts')
const DisplayPlayerInfoRoute = require('../routes/agent/DisplayPlayerInfoRouts')
const DisplayAssociationInfoRoute = require('../routes/agent/DisplayAssociationInfoRouts')
const RequestPlayerRoutes=require('../routes/player/requestPlayerRoutes')
const SharedIssuesRoutes=require('../routes/Represntor/mange-IssuesRoutes/SharedIssuesRoutes')
const AddMedalIssuesRoutes=require('../routes/Represntor/mange-IssuesRoutes/AddMedalIssuesRoutes')
const EditMedalIssuesRoutes=require('../routes/Represntor/mange-IssuesRoutes/EditMedalIssuesRoutes')
const PlayerInfoIssuesRoutes=require('../routes/Represntor/mange-IssuesRoutes/PlayerInfoIssuesRoutes')
const useModelRoutes=require('../routes/agent/useModelRoutes')
app.use(express.static(path.join(__dirname,"../public")))
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

// admin routes 
app.use("/",sharedRoutes)
app.use("/admin/agent",mangeAgentsOfMinistryRoutes)
app.use("/admin/representor",mangeRepresentorOfAssociation)
app.use("/admin/association",mangeAssociationRoutes)

// representor routes
app.use("/representor/player",mangePlayerRoutes)
app.use("/representor/championship",mangeChampionshipRouts)
app.use("/representor/medal",mangeMedalRouts)
app.use("/representor/playerSharedIssues",SharedIssuesRoutes)
app.use("/representor/playerAddIssues",AddMedalIssuesRoutes)
app.use("/representor/playerEditIssues",EditMedalIssuesRoutes)
app.use("/representor/PlayerInfoIssues",PlayerInfoIssuesRoutes)

// agent routes
app.use("/agent/playerInfo",DisplayPlayerInfoRoute)
app.use("/agent/associationInfo",DisplayAssociationInfoRoute)
app.use("/agent/useModal",useModelRoutes)

// player routes
app.use("/player",RequestPlayerRoutes)

app.all('*',(req,res)=>{
    res.send({
        massage:"not found routes"
    })
})

module.exports =app