define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
    this.reset();
    amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);  
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
   
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
		this.view.flxContainerColumns.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.flxRow1.width='100%';
        this.view.flxRow2.width='100%';

      }
      else {
		this.view.flxContainerColumns.layoutType = kony.flex.FLOW_HORIZONTAL;
        this.view.flxRow1.width='50%';
        this.view.flxRow2.width='50%';
      }
      this.view.forceLayout();
      form.forceLayout();
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },    
    
     getAppellantDemographicInfo:function (activeAppellant) {
  
      operationName =  "getAppellantDemographicsByAppellantId";
      var data= {"appellantId": activeAppellant};
   
      var headers= {};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, headers, data, 
                                     this.getAppellantDemographicInfoSuccess, 
                                     this.getAppellantDemographicInfoFailure);
    },

    getAppellantDemographicInfoSuccess:function(response) {
      kony.print(JSON.stringify(response));
      if(response !== null && response !== undefined) {
        if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
          response.errorMessage = apiErrors.errServerDemographics;
          response.userAction = apiActions.actionWait;
          navigateToErrorPage(response);  
        }
        else
        {
          if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
            response.errorStatus = response.errorStatus;
            response.userAction = apiActions.actionWait;
            navigateToErrorPage(response);  
          }   
          else 
          {         
            if(response.AppellantDemographicDetails !== null && response.AppellantDemographicDetails !== undefined) {
              var details = response.AppellantDemographicDetails[0]; 

              var name = details.AppellantFirstName+" "+details.AppellantMiddleName+" "+details.AppellantLastName;
             
              var vPrimary_phone =  details.PhoneDetails.filter(function(phone) {return phone.primaryInd == "Y"; });
               
              var vPrimaryPhone_number="";
              if(vPrimary_phone[0] !== null && vPrimary_phone[0] !== undefined)
                vPrimaryPhone_number = vPrimary_phone[0].phoneNumber;
              
              var address_mail =  details.AddressDetails.filter(function(addr) {return addr.addrTypCd == "Mailing"; });
              var address_res =  details.AddressDetails.filter(function(addr) {return addr.addrTypCd == "Residence"; });
 
              var ipv_mail =  details.AddressDetails.filter(function(addr) {return addr.addrTypCd == "IPV Residence"; });
              var ipv_res =  details.AddressDetails.filter(function(addr) {return addr.addrTypCd == "IPV Mailing"; });
              
              
              var mailAddres="";
              var resAddres="";
              if(address_mail[0] !== null && address_mail[0] !== undefined)
                mailAddres = address_mail[0].addrLine1+" "+address_mail[0].addrLine2+" "+address_mail[0].city+", "+address_mail[0].state+" "+address_mail[0].zipCd;
              if(address_res[0] !== null && address_res[0] !== undefined)
                resAddres = address_res[0].addrLine1+" "+address_res[0].addrLine2+" "+address_res[0].city+", "+address_res[0].state+" "+address_res[0].zipCd;
              
              if(ipv_mail[0] !== null && ipv_mail[0] !== undefined)
                mailAddres = ipv_mail[0].addrLine1+" "+ipv_mail[0].addrLine2+" "+ipv_mail[0].city+", "+ipv_mail[0].state+" "+ipv_mail[0].zipCd;
              if(ipv_res[0] !== null && ipv_res[0] !== undefined)
                resAddres = ipv_res[0].addrLine1+" "+ipv_res[0].addrLine2+" "+ipv_res[0].city+", "+ipv_res[0].state+" "+ipv_res[0].zipCd;

              if(address_res[0] !== null && address_res[0] !== undefined && address_res[0].addrLine1 === '')
                resAddres ="Appellant has not provided a residence address.";

                
              var vParticipateByPhone="";
              if(gblAppealDetailInfo.appellantPBPInd==="Y" && gblVrtHearingIndArSection!=="Y"){
                vParticipateByPhone = "Yes";
              }else{
                vParticipateByPhone = "No";
              }
              
              this.setData(name,vPrimaryPhone_number, vParticipateByPhone, details.Email, resAddres, mailAddres, details.InterpreterRequiredIndicator, details.languageId);
              gblDemographicInfo = details;
            }
          }
        }
      }
    },
    
     getAppellantDemographicInfoFailure:function(error) {
       var callSpecificMsg = "Unable to access demographic info.";
       currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
       currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
       currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg+"\n\n"+apiActions.actionCheckNetwork; 
       currentFrm.view.puInformationDialog.isVisible = true; 
       currentFrm.view.forceLayout();
  	},  
    
    setData: function(name, primaryPhone, participateByPhone, email, resAddress, mailAddress, interptrReq, interptrLang) {
 
      this.view.lblTitleSectionCard.text=name;
      this.view.lblDescName.text=name;
      this.view.lblDescPrimaryPhone.text=primaryPhone+"";
      this.view.lblDescParticipateByPhone.text=participateByPhone+"";
      this.view.lblDescEmail.text=email;
      this.view.lblDescEmail.toolTip = email;
      this.view.lblDescAddress1.text=resAddress;
      this.view.lblDescAddressMail1.text=mailAddress;
      if(interptrReq.trim() === 'Y') 
        this.view.lblDescInterptrReq.text= 'Yes';
      
      this.view.lblDescInterptrLang.text=gblLanguageList.filter(function(language) {return language.languageId == interptrLang;})[0].languageName;

      this.view.forceLayout();
    },  
    
     reset: function() {
      this.view.lblTitleSectionCard.text='';
      this.view.lblDescName.text='';
      this.view.lblDescPrimaryPhone.text='';
      this.view.lblDescParticipateByPhone.text='';
      this.view.lblDescEmail.text='';
      this.view.lblDescAddress1.text='';
      this.view.lblDescAddressMail1.text='';
    },  
    
    setComponentData: function(name, homePhone, cellphone, email, resAddress, mailAddress) {
    this.getAppellantDemographicInfo(gblAppellantId);
    },

  };
});