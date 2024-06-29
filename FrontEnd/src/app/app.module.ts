import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/Admin/home/home.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http"
import { NavbarComponent } from './components/Admin/navbar/navbar.component';
import { MangeRepresntorComponent } from './components/Admin/mange-represntor/mange-represntor.component';
import { LoginComponent } from './components/Admin/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { AddRepresntorComponent } from './components/Admin/add-represntor/add-represntor.component';
import { ToastrModule } from 'ngx-toastr';
import { EditRepresntorComponent } from './components/Admin/edit-represntor/edit-represntor.component';
import { MangeministryComponent } from './components/Admin/mangeministry/mangeministry.component';
import { AddministryComponent } from './components/Admin/addministry/addministry.component';
import { UpdateministryComponent } from './components/Admin/updateministry/updateministry.component';
import { MangeAssosiationComponent } from './components/Admin/mange-assosiation/mange-assosiation.component';
import { AddAssosiationComponent } from './components/Admin/add-assosiation/add-assosiation.component';
import { EditAssosiationComponent } from './components/Admin/edit-assosiation/edit-assosiation.component';
import { RepLayoutComponent } from './layouts/rep-layout/rep-layout.component';
import { RepNavbarComponent } from './components/RepresntorDashBord/rep-navbar/rep-navbar.component';
import { MangePlayerComponent } from './components/RepresntorDashBord/mange-player/mange-player.component';
import { AddPlayerComponent } from './components/RepresntorDashBord/add-player/add-player.component';
import {  registerLocaleData } from '@angular/common';
import tr from '@angular/common/locales/tr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EditePlayerComponent } from './components/RepresntorDashBord/edite-player/edite-player.component';
import { MangeChampionComponent } from './components/RepresntorDashBord/mange-champion/mange-champion.component';
import { AddChampionComponent } from './components/RepresntorDashBord/add-champion/add-champion.component';
import { EditChampionComponent } from './components/RepresntorDashBord/edit-champion/edit-champion.component';
import { AddMedalComponent } from './components/RepresntorDashBord/add-medal/add-medal.component';
import { 
EditMedalComponent } from './components/RepresntorDashBord/edit-medal/edit-medal.component';
import { PlayerDetailsComponent } from './components/RepresntorDashBord/player-details/player-details.component';
import { PlayersInAssosComponent } from './components/AgentOfMinistryDashBoard/players-in-assos/players-in-assos.component';
import { MinNavbarComponent } from './components/AgentOfMinistryDashBoard/min-navbar/min-navbar.component';
import { AllAssosComponent } from './components/AgentOfMinistryDashBoard/all-assos/all-assos.component';
import { MinistryLayoutComponent } from './layouts/ministry-layout/ministry-layout/ministry-layout.component';
import { DecimalFormatPipe } from './core/pips/decimal-format.pipe';
import { SearchPipe } from './core/pips/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './layouts/footer/footer.component';
import { RepfilterPipe } from './core/pips/repfilter.pipe';
import { ShowMemberComponent } from './components/Admin/show-member/show-member.component';
import { PlayerLayoutComponent } from './layouts/player-layout/player-layout.component';
import { PlayerHomeComponent } from './components/Player/player-home/player-home.component';
import { PlayerNavbarComponent } from './components/Player/player-navbar/player-navbar.component';
import { ReqToAddMedalComponent } from './components/Player/req-to-add-medal/req-to-add-medal.component';
import { ReqToEditMedalComponent } from './components/Player/req-to-edit-medal/req-to-edit-medal.component';
import { MangeIssuesComponent } from './components/RepresntorDashBord/mange-issues/mange-issues.component';
import { ReqToEditInfoComponent } from './components/Player/req-to-edit-info/req-to-edit-info.component';
import { InformationRequestComponent } from './components/RepresntorDashBord/information-request/information-request.component';
import { AddMedalReqComponent } from './components/RepresntorDashBord/add-medal-req/add-medal-req.component';
import { EditMedalRequestComponent } from './components/RepresntorDashBord/edit-medal-request/edit-medal-request.component';
import { PredictedPlayersComponent } from './components/AgentOfMinistryDashBoard/predicted-players/predicted-players.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { AuthNotFoundComponent } from './components/Admin/auth-not-found/auth-not-found.component';
registerLocaleData(tr);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
     NavbarComponent,
    MangeRepresntorComponent,
    LoginComponent,
    AddRepresntorComponent,
    EditRepresntorComponent,
    MangeministryComponent,
    AddministryComponent,
    UpdateministryComponent,
    MangeAssosiationComponent,
    EditAssosiationComponent,
    RepLayoutComponent,
    AddAssosiationComponent,
    RepNavbarComponent,
    MangePlayerComponent,  
      AddPlayerComponent,
    EditePlayerComponent,
    MangeChampionComponent,
    AddChampionComponent,
    EditChampionComponent,
    AddMedalComponent,
    EditMedalComponent,
    PlayerDetailsComponent,
    PlayersInAssosComponent,
    MinNavbarComponent,
    AllAssosComponent,
    MinistryLayoutComponent,
    SearchPipe,
    RepfilterPipe,
    FooterComponent,
    ShowMemberComponent,
    PlayerLayoutComponent,
    PlayerHomeComponent,
    PlayerNavbarComponent,
    ReqToAddMedalComponent,
    ReqToEditMedalComponent,
    MangeIssuesComponent,
    ReqToEditInfoComponent,
    InformationRequestComponent,
    AddMedalReqComponent,
    EditMedalRequestComponent,
    PredictedPlayersComponent,
    AuthNotFoundComponent,
  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ImageCropperModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxSpinnerModule
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true},

  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
