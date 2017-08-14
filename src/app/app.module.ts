import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {Routes,RouterModule} from '@angular/router'
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component'
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
    loadChildren:'./button/button.module#ButtonModule',
  }
]



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forChild(ansyncRoutes),
    RouterModule.forRoot(routes,{useHash:true})
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
