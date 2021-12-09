import { ApplicationRef, APP_INITIALIZER, NgModule, DoBootstrap} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { KeycloakSecurityService } from './services/keycloak-security.service';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptorService } from './services/request-interceptor.service';

/*export function kcFactory(kcSecurity:KeycloakSecurityService){
  return ()=> kcSecurity.init();
}*/

const secService= new KeycloakSecurityService();

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    SuppliersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [

    {provide: KeycloakSecurityService,useValue:secService},
   // {provide:APP_INITIALIZER, deps:[KeycloakSecurityService],useFactory:kcFactory, multi:true},
    {provide:HTTP_INTERCEPTORS , useClass:RequestInterceptorService, multi:true}
  ],
  entryComponents: [AppComponent]
  //bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: import("@angular/core").ApplicationRef): void {
    secService.init().then(data => {
      console.log('authenticated + toke :', data);
      appRef.bootstrap(AppComponent);

    }).catch(err => {
      console.error('err', err);
    });
  }
}
