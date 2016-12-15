# Overview
I'ce created an Angular2 with Webpack and Adal.js with the following features:
The app displays a list of "stuff", see [app/stuff.component.ts](./src/app/stuff.component.ts)

### 1. Used Webpack by following the tutorial at [here](https://angular.io/docs/ts/latest/guide/webpack.html).

### 2. Authentication with [Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-whatis) by using the [ng2-adal](https://www.npmjs.com/package/ng2-adal) package
- the instalation guidelines for [ng2-adal](https://www.npmjs.com/package/ng2-adal) are using SystemJs, i wanted to use webpack
- to accomodate Webpack I've made the following changes:
- added adal alias in [config/webpack.common.js](./config/webpack.common.js)

```javascript
             resolve: {
                extensions: ['', '.ts', '.js'],
                alias: {
                "adal$": "adal-angular",
                }
            }
```
- added typings using: 
```        
        npm install @types/adal --save
```        

### 3. Authentication from start
- no annonymus access is allowed
- no separate Log in button, there is AuthGuard added on the default "" route. See [app.module.ts](./src/app.module.ts).
  - on CanActivate it calls adalService.login(). See [app/AuthGuard.ts](./src/app/AuthGuard.ts)
- i've added a separate route for the OpenID callback to keep the URL clean
  - following OpenId, the token is posted to a URL specified in the initial authentication request
  - this URL is /oic
  - see [app/oicallback.component.ts](./src/app/oicallback.component.ts), on successfull authentication it redirects the app to the default route 


# instalation
### Step 1:  clone the repo
```
        git clone https://github.com/IoBebe/ng2-webpack-adal-example.git
```

### Step 2:  install dependencies
```
        npm install
```

### Step 3: Get an Azure Active Directory (Azure AD) tenant  
An Azure Active Directory (Azure AD) tenant. For more information on how to get an Azure AD tenant, please see [How to get an Azure AD tenant](https://azure.microsoft.com/en-us/documentation/articles/active-directory-howto-tenant/)       

### Step 4:  Register the sample with your Azure Active Directory tenant
1. Sign in to the [Azure portal](https://portal.azure.com).
2. On the top bar, click on your account and under the **Directory** list, choose the Active Directory tenant where you wish to register your application.
3. Click on **More Services** in the left hand nav, and choose **Azure Active Directory**.
4. Click on **App registrations** and choose **Add**.
5. Enter a friendly name for the application, for example "SinglePageApp-DotNet" and select "Web Application and/or Web API" as the Application Type. For the sign-on URL, enter the base URL for the sample, which is by default `https://localhost:44326/`. Click on **Create** to create the application.

### Step 5:  Enable the OAuth2 implicit grant for your application
By default, applications provisioned in Azure AD are not enabled to use the OAuth2 implicit grant. In order to run this sample, you need to explicitly opt in.
1. From the previous steps, your browser should still be on the Azure portal.
2. From your application page, choose **Manifest** to open the inline manifest editor.
3. Search for the `oauth2AllowImplicitFlow` property. You will find that it is set to `false`; change it to `true` and click on **Save** to save the manifest.

### Step 6: Configure App to use your tenant and application 
- change the [Azure AD Tenant GUID] and [Azure AD Client Id] in the [services/secret.service.ts](./src/services/secret.service.ts) file

### Step 7: Start the app
```
        npm start
```


### Step 7: Open the app
Open browser on http://localhost:18080
