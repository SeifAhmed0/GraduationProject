import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './components/Admin/home/home.component';
import { MangeRepresntorComponent } from './components/Admin/mange-represntor/mange-represntor.component';
import { LoginComponent } from './components/Admin/login/login.component';
import { AddRepresntorComponent } from './components/Admin/add-represntor/add-represntor.component';
import { EditRepresntorComponent } from './components/Admin/edit-represntor/edit-represntor.component';
import { MangeministryComponent } from './components/Admin/mangeministry/mangeministry.component';
import { AddministryComponent } from './components/Admin/addministry/addministry.component';
import { UpdateministryComponent } from './components/Admin/updateministry/updateministry.component';
import { MangeAssosiationComponent } from './components/Admin/mange-assosiation/mange-assosiation.component';
import { AddAssosiationComponent } from './components/Admin/add-assosiation/add-assosiation.component';
import { EditAssosiationComponent } from './components/Admin/edit-assosiation/edit-assosiation.component';
import { RepLayoutComponent } from './layouts/rep-layout/rep-layout.component';
import { MangePlayerComponent } from './components/RepresntorDashBord/mange-player/mange-player.component';
import { represntorGuard } from './core/Guard/represntor.guard';
import { adminGuard } from './core/Guard/admin.guard';
import { loginGuard } from './core/Guard/login.guard';
import { AddPlayerComponent } from './components/RepresntorDashBord/add-player/add-player.component';
import { EditePlayerComponent } from './components/RepresntorDashBord/edite-player/edite-player.component';
import { MangeChampionComponent } from './components/RepresntorDashBord/mange-champion/mange-champion.component';
import { EditChampionComponent } from './components/RepresntorDashBord/edit-champion/edit-champion.component';
import { AddChampionComponent } from './components/RepresntorDashBord/add-champion/add-champion.component';
import { AddMedalComponent } from './components/RepresntorDashBord/add-medal/add-medal.component';
import { EditMedalComponent } from './components/RepresntorDashBord/edit-medal/edit-medal.component';
import { PlayerDetailsComponent } from './components/RepresntorDashBord/player-details/player-details.component';
import { MinistryLayoutComponent } from './layouts/ministry-layout/ministry-layout/ministry-layout.component';
import { PlayersInAssosComponent } from './components/AgentOfMinistryDashBoard/players-in-assos/players-in-assos.component';
import { AllAssosComponent } from './components/AgentOfMinistryDashBoard/all-assos/all-assos.component';
import { ministryGuard } from './core/Guard/ministry.guard';
import { MinplayerDetailsComponent } from './components/AgentOfMinistryDashBoard/minplayer-details/minplayer-details.component';
import { ShowMemberComponent } from './components/Admin/show-member/show-member.component';
import { PlayerLayoutComponent } from './layouts/player-layout/player-layout.component';
import { PlayerHomeComponent } from './components/Player/player-home/player-home.component';
import { playerGuard } from './core/Guard/player.guard';
import { ReqToAddMedalComponent } from './components/Player/req-to-add-medal/req-to-add-medal.component';
import { ReqToEditMedalComponent } from './components/Player/req-to-edit-medal/req-to-edit-medal.component';
import { MangeIssuesComponent } from './components/RepresntorDashBord/mange-issues/mange-issues.component';
import { ReqToEditInfoComponent } from './components/Player/req-to-edit-info/req-to-edit-info.component';
import { InformationRequestComponent } from './components/RepresntorDashBord/information-request/information-request.component';
import { AddMedalReqComponent } from './components/RepresntorDashBord/add-medal-req/add-medal-req.component';
import { EditMedalRequestComponent } from './components/RepresntorDashBord/edit-medal-request/edit-medal-request.component';
import { PredictedPlayersComponent } from './components/AgentOfMinistryDashBoard/predicted-players/predicted-players.component';
import { AuthNotFoundComponent } from './components/Admin/auth-not-found/auth-not-found.component';


const routes: Routes = [
  {path:'',component:AuthLayoutComponent,children:[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',canActivate:[loginGuard],component:LoginComponent,title:'login'}
  ]},

  {path:'',component:BlankLayoutComponent,children:[
    {path:'',redirectTo:'Adminhome',pathMatch:'full'},
    {path:'Adminhome',canActivate:[adminGuard],component:HomeComponent,title:'home'},
    {path:'MangeRepresntor',canActivate:[adminGuard],component:MangeRepresntorComponent,title:'MangeRepresntor'},
    {path:'AddRepresntor',canActivate:[adminGuard],component:AddRepresntorComponent,title:'AddRepresntor'},
    {path:'EditRepresntor/:id',canActivate:[adminGuard],component:EditRepresntorComponent,title:'EditRepresntor'},
    {path:'mangeMinistry',canActivate:[adminGuard],component:MangeministryComponent,title:'mangeMinistry'},
    {path:'addMinistry',canActivate:[adminGuard],component:AddministryComponent,title:'addMinistry'},
    {path:'updataMinistry/:id',canActivate:[adminGuard],component:UpdateministryComponent,title:'EditMinistry'},
    {path:'mangeAssosiation',canActivate:[adminGuard],component:MangeAssosiationComponent,title:'mangeAssosiation'},
    {path:'addAssosiation',canActivate:[adminGuard],component:AddAssosiationComponent,title:'addAssosiation'},
    {path:'updataAssosiation/:id',canActivate:[adminGuard],component:EditAssosiationComponent,title:'updataAssosiation'},
    {path:'showMember/:id',canActivate:[adminGuard],component:ShowMemberComponent,title:'showMember'},
    
  ]},
  {path:'',component:RepLayoutComponent,children:[
    {path:'',redirectTo:'mangePlayer',pathMatch:'full'},
    {path:'mangePlayer',canActivate:[represntorGuard],component:MangePlayerComponent,title:'mangePlayer'},
    {path:'addPlayer',canActivate:[represntorGuard],component:AddPlayerComponent,title:'Add Player'},
    {path:'editPlayer/:id',canActivate:[represntorGuard],component:EditePlayerComponent,title:'edit Player'},
    {path:'playerDetails/:id',canActivate:[represntorGuard],component:PlayerDetailsComponent,title:'player details'},
    {path:'mangeChampion',canActivate:[represntorGuard],component:MangeChampionComponent, title:'mange Champion'},
    {path:'addChampion',canActivate:[represntorGuard],component:AddChampionComponent, title:'add champion'},
    {path:'editChampion/:id',canActivate:[represntorGuard],component:EditChampionComponent, title:'edit champion'},
    {path:'addmedal/:playerId',canActivate:[represntorGuard],component:AddMedalComponent, title:'add medal'},
    {path:'editmedal/:playerId/:medalId',canActivate:[represntorGuard],component:EditMedalComponent, title:'edit medel'},
    {path:'MangeIssues',canActivate:[represntorGuard],component:MangeIssuesComponent, title:'MangeIssues'},
    {path:'informationRequest/:id',canActivate:[represntorGuard],component:InformationRequestComponent, title:'informationRequest'},
    {path:'addMedalReq/:id',canActivate:[represntorGuard],component:AddMedalReqComponent, title:'addMedalReq'},
    {path:'EditMedalReq/:id',canActivate:[represntorGuard],component:EditMedalRequestComponent, title:'EditMedalReq'},
  ]},
  
  {path:'',component:MinistryLayoutComponent,children:[
    {path:'',redirectTo:'allAssos',pathMatch:'full'},
    {path:'allAssos',canActivate:[ministryGuard],component:AllAssosComponent,title:'allAssos'},
    {path:'playersInAssos/:id',canActivate:[ministryGuard],component:PlayersInAssosComponent,title:'Players In Assos'},
    {path:'playerDetails/:playerId/:AssosId',canActivate:[ministryGuard],component:MinplayerDetailsComponent,title:'Player Details'},
    {path:'predictedPlayers',canActivate:[ministryGuard],component:PredictedPlayersComponent,title:'predictedPlayers'},
  ]},
  {path:'',component:PlayerLayoutComponent,children:[
    {path:'',redirectTo:'playerHome',pathMatch:'full'},
    {path:'playerHome',canActivate:[playerGuard],component:PlayerHomeComponent,title:'home'},
    {path:'ReqToAddMedal',canActivate:[playerGuard],component:ReqToAddMedalComponent,title:'ReqToAddMedal'},
    {path:'reqToEditMedal/:medalId',canActivate:[playerGuard],component:ReqToEditMedalComponent, title:'reqToEditMedal'},
    {path:'ReqToEditInfo',canActivate:[playerGuard],component:ReqToEditInfoComponent,title:'ReqToEditInfo'},

  ]},
  {path:'**', component:AuthNotFoundComponent , title:'NotFound'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
