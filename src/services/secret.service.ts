import {Injectable} from '@angular/core';


@Injectable()
export class SecretService {

    public get adalConfig(): any {
        return {
            instance: 'https://login.microsoftonline.com/',
            tenant: '[Azure AD Tenant GUID]',
            clientId: '[Azure AD Client Id]',
            redirectUri: window.location.origin + "/oic",
            postLogoutRedirectUri: window.location.origin + "/oic"
        };
    }
}