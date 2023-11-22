/**
* @function: initiateCaptcha
* @description: Called to render the reCAPTCHA
*/ 
var initiateCaptcha = function() {
  var arr = [];
  arr.push('autoLoad');
  voltmx.evaluateJavaScriptInNativeContext("_recaptcha_Callback("+JSON.stringify(arr)+")");
};

/**
* @function: window.onload
* @description: Called to render the reCAPTCHA, after window.onload
				voltmx context is binded to onload, so gave 1 sec delay
                to avoid race conditions
*/ 
window.onload = function(){
  setTimeout(function() { initiateCaptcha(); }, 1000);
};

/**
* @function: setSiteKey
* @description: Called to load captcha script with client's site Key
*/ 
var setSiteKey = function(params){
  if(typeof params === 'string'){
    params = JSON.parse(params);
  }
  var siteKey = params.siteKey || null;
  var pageName = params.pageName || null;
  var isV2Checkbox = !!params.isV2Checkbox;
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  if (isV2Checkbox) {
    script.setAttribute('src', 'https://www.google.com/recaptcha/api.js?render=explicit');
  } else {
    script.setAttribute('src', 'https://www.google.com/recaptcha/api.js?render=' + siteKey);
  }
  script.addEventListener('load', renderCaptchaBySiteKey.bind(this,siteKey, pageName, isV2Checkbox), false);            
  document.body.appendChild(script); 
};

/**
* @function: renderCaptchaBySiteKey
* @description: Called to render the reCAPTCHA
*/ 
function renderCaptchaBySiteKey(siteKey, pageName, isV2Checkbox){
  if(grecaptcha !== undefined){
    grecaptcha.ready(function(pageName, siteKey, isV2Checkbox) {
      if (isV2Checkbox) {
        grecaptcha.render('example1', {
          'sitekey' : siteKey,
          'callback' : function(pageName, token) {
                          validateCaptchaToken(token, pageName);
                        }.bind(this, pageName),
        });
      } else {
        grecaptcha.execute(siteKey, 
                           {action: pageName}).then(function(pageName, token) {
          validateCaptchaToken(token, pageName);
        }.bind(this, pageName));
      }
    }.bind(this, pageName, siteKey, isV2Checkbox));

  } else{
    console.log('grecaptcha script not loaded yet');
  }
}


/**
* @function: validateCaptchaToken
* @description: Called to validate the reCAPTCHA token
*/  
var validateCaptchaToken = function(token, pageName){
  var arr = [];
  arr.push("validate");
  arr.push(pageName);
  arr.push(token);
  voltmx.evaluateJavaScriptInNativeContext("_recaptcha_Callback("+JSON.stringify(arr)+")");

};