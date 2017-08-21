import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {Routes,RouterModule} from '@angular/router'
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as $ from 'jquery';
//router
const routes:Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:"full"
  },
  {
    path:'home',
    component:HomeComponent,
  },
  {
    path:"**",
    redirectTo:'/home',
    pathMatch:"full"
  }
];


const ansyncRoutes:Routes = [
  {
    path:'button',
    loadChildren:'./button-page/button.module#ButtonModule',
  },
  {
    path:'table',
    loadChildren:'./table-page/table-page.module#TablePageModule',
  },
  {
    path:'modal',
    loadChildren:'./modal-page/modal-page.module#ModalPageModule',
  }
]



@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    RouterModule.forChild(ansyncRoutes),
    RouterModule.forRoot(routes,{useHash:true}),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
