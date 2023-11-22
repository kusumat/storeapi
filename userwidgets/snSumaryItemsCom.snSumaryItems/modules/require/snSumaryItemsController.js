define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this.view.sgmDataOptionsSummary.onRowClick = this.navigateToEditPage;
      this.view.flxBtnEditAppellantInfo.onTouchEnd = this.navigateToEditAppellantInfo;
      this.view.flxBtnEditAppellantInfo.onTouchEnd = this.navigateToEditAppellantInfo;
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1); 
      this.displayAppellantInfo();

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
        this.view.lblTitle1.skin                = 'sknLblGrayishDark115Mobile';
        this.view.lblTitle02.skin               = 'sknLblGrayishDark115Mobile';
        this.view.btnUpdateSummary.top          = '10px';

        this.view.sgmDataOptionsSummary.rowTemplate = 'flxtmpSgmSummaryEditMobile';
        this.view.flxContainerHeaderWithButtons2.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.lblTitle02.height = 'Preferred';
        this.view.btnUpdateSummary.height = 'Preferred';

        this.view.lblTypeTitleResident.width = '100px';
        this.view.lblTypeTitleAddress.width = '100px';

        this.view.lblResidenceAddressTitle.width = '100px';
        this.view.lblResidenceAddressTitle.width = '100px';       
        this.view.lblDescName.skin = 'sknLblBlackModerate90';
        this.view.lblDescEmail.skin = 'sknLblBlackModerateBold90Mobile';
        this.view.lblDescResidence.skin = 'sknLblBlackModerateBold90Mobile';
        this.view.lblDescEmail.text = this.view.lblDescEmail.text.replace("@", "@\n");
        this.view.lblAppellantEmailValue.text = this.view.lblAppellantEmailValue.text.replace("@", "@\n");           
        
        this.view.lblDescAddress.skin = 'sknLblBlackModerateBold90Mobile';
        this.view.sgmPhoneNumbers.rowTemplate = 'flxPhoneNumberContainerMobile';
        
        this.view.lblAppellantInfoTitle.skin = 'sknLblBlackModerateBold90Mobile';
      }
      else {
        this.view.lblTitle1.skin                = 'sknLblGrayishDark115';
        this.view.lblTitle02.skin               = 'sknLblGrayishDark115';
        this.view.btnUpdateSummary.top          = 'Default';

        this.view.sgmDataOptionsSummary.rowTemplate = 'flxtmpSgmSummaryEdit';  
        this.view.flxContainerHeaderWithButtons2.layoutType = kony.flex.FLOW_HORIZONTAL;
        this.view.lblTitle02.height = '40dp';
        this.view.btnUpdateSummary.height = '40dp';

        this.view.lblTypeTitleResident.width = 'Preferred';
        this.view.lblTypeTitleAddress.width = 'Preferred';

        this.view.lblResidenceAddressTitle.width = 'Preferred';
        this.view.lblResidenceAddressTitle.width = 'Preferred';
        
        this.view.lblDescName.skin = 'sknLblBlackModerate90';
        this.view.lblDescEmail.skin = 'sknLblBlackModerate90';
        
        this.view.lblDescEmail.text = this.view.lblDescEmail.text.replace("@\n", "@");
        this.view.lblAppellantEmailValue.text = this.view.lblAppellantEmailValue.text.replace("@\n", "@");
        this.view.lblDescResidence.skin = 'sknLblBlackModerate90';
        this.view.lblDescAddress.skin = 'sknLblBlackModerate90'; 
        this.view.sgmPhoneNumbers.rowTemplate = 'flxPhoneNumberContainer';
        
        this.view.lblAppellantInfoTitle.skin = 'sknLblBlackModerateBold100';
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },    

    displayAppellantInfo:function() {
      if(gblIsARUser) {
        this.view.flxAppellantInfo.isVisible = true;
        this.view.flxContainerPersonalHeader.isVisible = true;
        this.view.flxUILine2.isVisible = true;
        this.view.flxContainerHeaderWithButtons2.isVisible = false;
        this.view.flxContainerColumns.isVisible = false;
        this.view.btnEditSummary.isVisible = false;
        this.view.flxUILine.isVisible = false;
      }
      else {
        this.view.flxAppellantInfo.isVisible = false;
        this.view.flxContainerPersonalHeader.isVisible = false;
        this.view.flxUILine2.isVisible = false;        
        this.view.flxContainerHeaderWithButtons2.isVisible = true;
        this.view.flxContainerColumns.isVisible = true;
        this.view.btnEditSummary.isVisible = true;
        this.view.flxUILine.isVisible = false;        
      }
    },

    navigateToEditPage:function() {
      var selectedRow = this.view.sgmDataOptionsSummary.selectedRowItems[0];
      var lblTextTitleSec = selectedRow.lblTextTitleSec;
//       if(lblTextTitleSec === "Benefits Program(s):") {
//         this.adjustProgramsAndIssues();
//       }
      var editPage = selectedRow.editPage; 
      gblIssueNumber = selectedRow.issueNumber;
      gblBenefitsProgram = selectedRow.Program;
      gblWhatHappenedCode = selectedRow.issueCode;
      if(editPage !== "") {
        var params = {"isSummaryEdit":true, appellantInfo:appellantInfo};
        var ntf = new kony.mvc.Navigation(editPage);
        ntf.navigate(params);           
      }
    },

    navigateToEditAppellantInfo:function() {
      var params = {"isSummaryEdit":true};
      var ntf = new kony.mvc.Navigation("frmARHearingRequestStep2");
      ntf.navigate(params);           
    },   

    adjustProgramsAndIssues:function() {

      //if editing a program or issue then put it at the end of the list for editing.
      var selectedRow = this.view.sgmDataOptionsSummary.selectedRowItems[0];
      var selectedRowIndex = this.view.sgmDataOptionsSummary.selectedRowIndex[1];
      var issueRow = this.view.sgmDataOptionsSummary.data[selectedRowIndex+1];
      var program = selectedRow.lblTextDesc;
      var issue = issueRow.lblTextDesc;
      var issueCode = "";
      var issueNumber = selectedRow.IssueNumber;

      if (!Object.entries) { //IE11
        programsAndIssues.forEach(function(entry, key, map) {
          if(program === entry[0] && issue === entry[1]) {
            issueCode = entry[2];
            programsAndIssues.delete(key);
            //           break;
          }
        });      
      } 
      else {
        var entries = programsAndIssues.entries();
        var element = entries.next();
        while(!element.done) {
          var entry = element.value[1];        
          if(program === entry[0] && issue === entry[1]) {
            issueCode = entry[2];
            programsAndIssues.delete(element[0]);
            break;
          }
          element = entries.next();
        }
      }

      //programsAndIssues.set(new Date().getTime(), [program, issue, issueCode]);
      gblBenefitsProgram = program;  //the program is udsed to set the Benefits Program selection
      gblWhatHappenedText = issue; //this comes along for the ride as an essential value
      gblWhatHappenedCode = issueCode; //the code is used to set the What Happened selection
    },

    setDemographicDataForSummary:function() {

      var addressDetail = null;
      var address = "";

      if(gblIsARUser) {
        addressDetail = hearingRequest.addressDetails[0];
        if(hearingRequest.homelessInd === "Y") {
          address = "Homeless \n" + addressDetail.county + " County";
        }
        else {
          address = (addressDetail.addrLine2 !== "" ? addressDetail.addrLine1 + "\n" + addressDetail.addrLine2 : addressDetail.addrLine1) + "\n" + addressDetail.city + ", " + addressDetail.state + " " + addressDetail.zipCd;
          if(addressDetail.county !== "") {
            address += "\n" + addressDetail.county + " County";
          }
        }
        this.view.lblAppellantNameValue.text = hearingRequest.appellantFirstName + " " + hearingRequest.appellantLastName;
        this.view.lblAppellantEmailValue.text = hearingRequest.email === "" ? "None" : hearingRequest.email;
        this.view.lblResidenceAddressValue.text = address; 
        this.addPhoneNumbersToSummary(hearingRequest.phoneDetails);        
      }
      else 
      {
        this.view.lblDescName.text = gblDemographicInfo.AppellantFirstName + " " + gblDemographicInfo.AppellantLastName;
        this.view.lblDescEmail.text = gblDemographicInfo.Email === "" ? "None" : gblDemographicInfo.Email; 
        this.view.lblDescEmail.text = this.view.lblDescEmail.text.replace("@", "\n@");
        this.view.lblDescEmail.toolTip = gblDemographicInfo.Email === "" ? "None" : gblDemographicInfo.Email; 

        if(gblDemographicInfo.PhoneDetails !== null &&
           gblDemographicInfo.PhoneDetails !== undefined &&
           gblDemographicInfo.PhoneDetails.length > 0) {
          var phoneDetails = gblDemographicInfo.PhoneDetails;
          this.addPhoneNumbersToSummary(phoneDetails);
        }

        if(gblDemographicInfo.AddressDetails !== null &&
           gblDemographicInfo.AddressDetails !== undefined &&
           gblDemographicInfo.AddressDetails.length > 0) {
          var addressDetails = gblDemographicInfo.AddressDetails;
          var hasMailingAddress = false;
          for(var j = 0; j < addressDetails.length; j++) {
            addressDetail = addressDetails[j];
            var homelessIndicator = gblDemographicInfo.HomelessIndicator; 
            if(addressDetail.addrTypCd === "Mailing") {
              hasMailingAddress = true;
              if(homelessIndicator === "Y") {
                address = "Homeless \n" + addressDetail.county + " County";
              }
              else {
                address = (addressDetail.addrLine2 !== "" ? addressDetail.addrLine1 + ",\n" + addressDetail.addrLine2 : addressDetail.addrLine1) + "\n" + addressDetail.city + ", " + addressDetail.state + " " + addressDetail.zipCd;
                if(addressDetail.county !== "") {
                  address += "\n" + addressDetail.county + " County";
                }
              }
              this.view.lblDescAddress.text = address;
            }
            if(addressDetail.addrTypCd === "Residence") {
              if(homelessIndicator === "Y") {
                address = "Homeless \n" + addressDetail.county + " County";
              }
              else {
                address = (addressDetail.addrLine2 !== "" ? addressDetail.addrLine1 + ",\n" + addressDetail.addrLine2 : addressDetail.addrLine1) + "\n" + addressDetail.city + ", " + addressDetail.state + " " + addressDetail.zipCd;
                if(addressDetail.county !== "") {
                  address += "\n" + addressDetail.county + " County";
                }
              }
              this.view.lblDescResidence.text = address;
            }
          }
          this.view.flxContainerInfoMailAddress.isVisible = hasMailingAddress;
        }
      }

    },

    addPhoneNumbersToSummary:function(phoneDetails) {
      var dataRows = [];
      var row = "";
      var phoneDetail = null;
      //primary must be on top, let's get that one first
      for(var i = 0; i < phoneDetails.length; i++) {
        phoneDetail = phoneDetails[i];
        //        if(phoneDetail.phoneTypCD === phoneDetail.phoneTypCD) {
        if(phoneDetail.primaryInd === "Y") {
          row = {"lblPhoneNumberType": phoneDetail.phoneTypCD + " Phone:", 
                 "lblPhoneNumber": normalizePhone(phoneDetail.phoneNumber),
                 "primaryIndicator":phoneDetail.primaryInd
                };
          dataRows.push(row);
          break;
        }
        //        }
      }

      //with primary done, now we add the secondary numbers      
      var phoneTypeList = ["Cell","Home","Work","Business","Fax"];
      for(i = 0; i < phoneTypeList.length; i++) {
        var phoneType = phoneTypeList[i];
        for(var j = 0; j < phoneDetails.length; j++) {
          phoneDetail = phoneDetails[j];
          if(phoneType === phoneDetail.phoneTypCD) {
            if(phoneDetail.primaryInd !== "Y") {
              row = {"lblPhoneNumberType": phoneDetail.phoneTypCD + " Phone:", 
                     "lblPhoneNumber": normalizePhone(phoneDetail.phoneNumber),
                     "primaryIndicator":phoneDetail.primaryInd
                    };
              dataRows.push(row);

            }
          }
        }
      }
      if(gblIsARUser) {
        this.view.sgmAppellantInfoPhoneNumbers.setData(dataRows);        
      }
      else {
        this.view.sgmPhoneNumbers.setData(dataRows);    
      }
    }
  };
});