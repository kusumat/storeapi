function AS_AppEvents_aad9fba44c7048fa9077f4a20cfde151(eventobject) {
    /*
    ref: https://basecamp.temenos.com/s/question/0D56A00001709pXSAQ/desktop-web-application-redirecting-to-a-nonstartup-form-on-app-launch
    */
    kony.application.setApplicationInitializationEvents({
        appservice: appServiceCallBack
    });
    kony.print("===============setAppInitializationEvents excuted=======");
}