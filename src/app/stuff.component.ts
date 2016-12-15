import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AdalService} from "ng2-adal/services";
import {SecretService} from '../services/secret.service';


@Component({
  selector: 'my-app',
  templateUrl: './stuff.component.html',
})
export class StuffComponent implements OnInit { 
  public stuff : Observable<string[]>;

  constructor(
        private adalService: AdalService,
        private secretService: SecretService){
          this.adalService.init(this.secretService.adalConfig);
          this.adalService.handleWindowCallback();
  }

  ngOnInit(){
    if(this.adalService.userInfo.isAuthenticated){
      this.stuff = new Observable<string[]>(
        (sub:any) =>{
          setTimeout(()=>{
            sub.next(["alpha", "beta","gama"]);
          }, 1000);
        }
      );
    }
    else{
      // this.adalService.login();
    }
  }
}
