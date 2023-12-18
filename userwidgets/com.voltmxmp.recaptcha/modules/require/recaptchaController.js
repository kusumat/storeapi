define(['./voltmxLogger'],function(voltmxLoggerModule) {
  var voltmxmp = voltmxmp || {};
  voltmxmp.logger = (new voltmxLoggerModule("reCAPTCHA Component")) || function() {};
  voltmxmp.logger.setLogLevel("DEBUG");
  var SITE_KEY_TYPE_V2_CHECKBOX = 'V2_CHECKBOX';
  var SITE_KEY_TYPE_V3 = 'V3';
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._siteKey = null;
      this._secretKey = null;
      this._pageName = null;
      this._autoLoad = false;
      this._isV2Checkbox = true;
      /**
       * @function
       * This function will be called for loading the captcha, token validation
       * @param param
       */
      _recaptcha_Callback = function(param){
        switch (param[0]){
          case 'autoLoad' :
            if(this._autoLoad) {
              this.renderCaptcha();
            }
            break;  

          case 'validate' :
            this.validateCaptchaToken(param[1], param[2]);
            break;
        }
      }.bind(this);
    },


    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      /**
           * @property: siteKey
           * @description: This siteKey is used for rendering the reCAPTCHA
           * @param: string
           */
      defineSetter(this, 'siteKey', function (val) {
        voltmxmp.logger.trace('----------Entering siteKey Setter---------', voltmxmp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== '') {
          this._siteKey = val;
        }
        voltmxmp.logger.trace('----------Exiting siteKey Setter---------', voltmxmp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, 'siteKey', function () {
        voltmxmp.logger.trace('----------Entering siteKey Getter---------', voltmxmp.logger.FUNCTION_ENTRY);
        voltmxmp.logger.trace('----------Exiting siteKey Getter---------', voltmxmp.logger.FUNCTION_EXIT);
        return this._siteKey;
      });
      /**
           * @property: secretKey
           * @description: This secretkey is for validating the reCAPTCHA
           * @param: string
           */
      defineSetter(this, 'secretKey', function (val) {
        voltmxmp.logger.trace('----------Entering secretKey Setter---------', voltmxmp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== '') {
          this._secretKey = val;
        }
        voltmxmp.logger.trace('----------Exiting secretKey Setter---------', voltmxmp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, 'secretKey', function () {
        voltmxmp.logger.trace('----------Entering secretKey Getter---------', voltmxmp.logger.FUNCTION_ENTRY);
        voltmxmp.logger.trace('----------Exiting secretKey Getter---------', voltmxmp.logger.FUNCTION_EXIT);
        return this._secretKey;
      });
      /**
           * @property: pageName
           * @description: This pageName is for knowing the recapatcha origin
           * @param: string
           */
      defineSetter(this, 'pageName', function (val) {
        voltmxmp.logger.trace('----------Entering pageName Setter---------', voltmxmp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== '') {
          this._pageName = val;
        }
        voltmxmp.logger.trace('----------Exiting pageName Setter---------', voltmxmp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, 'pageName', function () {
        voltmxmp.logger.trace('----------Entering pageName Getter---------', voltmxmp.logger.FUNCTION_ENTRY);
        voltmxmp.logger.trace('----------Exiting pageName Getter---------', voltmxmp.logger.FUNCTION_EXIT);
        return this._pageName;
      });
      /**
           * @property: autoLoad
           * @description: This autoLoad is to load the captcha during startup
           * @param: string
           */
      defineSetter(this, 'autoLoad', function (val) {
        voltmxmp.logger.trace('----------Entering autoLoad Setter---------', voltmxmp.logger.FUNCTION_ENTRY);
        if (val !== undefined) {
          this._autoLoad = val;
        }
        voltmxmp.logger.trace('----------Exiting autoLoad Setter---------', voltmxmp.logger.FUNCTION_EXIT);
      });
      defineGetter(this, 'autoLoad', function () {
        voltmxmp.logger.trace('----------Entering autoLoad Getter---------', voltmxmp.logger.FUNCTION_ENTRY);
        voltmxmp.logger.trace('----------Exiting autoLoad Getter---------', voltmxmp.logger.FUNCTION_EXIT);
        return this._autoLoad;
      });
      /**
           * @property: siteKeyType
           * @description: The type of the siteKey that used for rendering the reCAPTCHA
           * @param: V2_CHECKBOX , or V3
           */
      defineSetter(this, 'siteKeyType', val => {
        voltmxmp.logger.trace('----------Entering siteKeyType Setter---------', voltmxmp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val === SITE_KEY_TYPE_V3) {
          this._isV2Checkbox = false;
        }
      });

      defineGetter(this, 'siteKeyType', () => {
        voltmxmp.logger.trace('----------Entering siteKeyType Getter---------', voltmxmp.logger.FUNCTION_ENTRY);
        voltmxmp.logger.trace('----------Exiting siteKeyType Getter---------', voltmxmp.logger.FUNCTION_EXIT);
        return this._isV2Checkbox ? SITE_KEY_TYPE_V2_CHECKBOX: SITE_KEY_TYPE_V3;
      });
    },

    /**
    * @function
    * Renders the reCAPTCHA by using the siteKey from the component property
    */
    renderCaptcha:function(){
      voltmxmp.logger.trace("----------Entering renderCaptcha Function---------", voltmxmp.logger.FUNCTION_ENTRY);
      this.view.captchaBrowser.evaluateJavaScript('setSiteKey('+JSON.stringify({'siteKey':this._siteKey,'pageName':this._pageName, 'isV2Checkbox': this._isV2Checkbox})+')');
      voltmxmp.logger.trace("----------Exiting renderCaptcha Function---------", voltmxmp.logger.FUNCTION_EXIT); 
    },
    /**
    * @function: validateCaptchaToken
    * @description: Called to validate the reCAPTCHA token
    */
    validateCaptchaToken:function(pageName, responseToken){     
      if (pageName !== "Init") {
        var client = voltmx.sdk.getCurrentInstance();
        operationName =  "validateToken";
        var data = {
          "token": responseToken,
          "siteKey": gblGoogleRecaptchaSitekey,
          "apiKey": gblGoogleRecaptchaApikey,
          "expectedAction": pageName

        };
        var headers = {};
        var serviceName = "GoogleEnterpriseRecaptchaV3";
        var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
        integrationObj.invokeOperation(operationName, headers, data, this.verificationCallback, this.errorCallback);           
      }
    },
    /**
    * @event: verificationCallback
    * @description: Called when reCAPTCHA returns the CAPTCHA validation
    */
    verificationCallback:function(result){
    },
    /**
    * @event: errorCallback
    * @description: Called when fabric API encounters an error
    */
    errorCallback:function(error){
    }
  };
});
