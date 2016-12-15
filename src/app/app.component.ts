import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AdalService} from "ng2-adal/services";
import {SecretService} from '../services/secret.service';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit { 
  public userName : string = '(no user)';

  constructor(
        private adalService: AdalService,
        private secretService: SecretService){
          this.adalService.init(this.secretService.adalConfig);
          this.adalService.handleWindowCallback();
  }

  ngOnInit(){
    if(this.adalService.userInfo.isAuthenticated){
      this.userName = this.adalService.userInfo.userName;     
    }
    else{
      this.userName = 'not authenticated yet';
    }
  }
}
