import { Injectable } from '@angular/core';
import { KeycloakInstance } from 'keycloak-js';

declare var  Keycloak:any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {
  public kc!:KeycloakInstance;

  constructor() { }
   init(){
    return new Promise((resolve,reject)=>{

      console.log("Security Initialisation ... ");
      this.kc = new Keycloak({
        url: "http://localhost:8080/auth",
        realm: "ecom-realm",
        clientId: "AngularProductsApp"
      });
      
      this.kc.init({
        onLoad: 'check-sso',
      }).then((authenticated)=>{
        resolve({auth:authenticated, token:this.kc.token});
      }).catch(err=>{
        reject(err);
      });
      

    });
   
    
  }
}
