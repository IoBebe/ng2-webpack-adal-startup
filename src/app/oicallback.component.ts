import {Component, OnInit} from '@angular/core';
import {AdalService} from "ng2-adal/services";
import {SecretService} from '../services/secret.service';
import {Router, NavigationExtras} from '@angular/router';

@Component({    
    selector: 'my-app',
    template: 'redirecting....',
})

export class OiCallbackComponent implements OnInit {
    public userName: string;

    constructor(
        private adalService: AdalService,
        private secretService: SecretService,
        private router: Router) {
            console.log("oicallback.component.ctor");
        }

    ngOnInit() { 
        console.log("oicallback.component.onInit: "+this.router.url);

        if (this.adalService.userInfo.isAuthenticated) {
            console.log("oicallback.component.onInit: is authenticated");             
            
            if(this.router.url.includes("/oic")){
                console.log("oicallback.component.onInit: redirecting");  
                              
                return this.router.navigate(["/"],{
                    preserveQueryParams: false,
                    preserveFragment: false,
                    skipLocationChange: false,
                    replaceUrl: true
                }).then(r=>{
                    if(r===false){
                        console.log("oicallback.component.onInit: Coult not redirect back to home.");
                    }
                });
            }                        
        }
    }  

}