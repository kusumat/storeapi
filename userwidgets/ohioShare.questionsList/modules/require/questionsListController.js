define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.PrimaryButton.onClickNav = this.setClickNav;
      this.setData();
      this.view.flxQuestionListHeadingContainer.accessibilityConfig = {
        "a11yLabel": this.view.lblTitle.text,
        "a11yARIA": {"role": "heading", "aria-level": "2"},
        "a11yIndex": 0,
        "a11yHidden": false
      };
     },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    setClickNav:function(){
      if (this.view.PrimaryButton.buttonText.trim() === 'LOGIN'){
        this.navigateTo('frmLogin');
      }
    },
    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    navigateTo:function(form){
      var x = new kony.mvc.Navigation(form);
      x.navigate();
    },
    setData:function(){
      var dataMap = {
        "btnFlxContainerQuestion": "btnFlxContainerQuestion",
        "btnFlxDownIndicator": "btnFlxDownIndicator",
        "flxContainerAnswer": "flxContainerAnswer",
        "lblQuestionTitle": "lblQuestionTitle",
        "rTextDescription":"rTextDescription",
        "btnArrow": "btnArrow",
        "lblAnswer": "lblAnswer",
      };
      this.view.sgmQuestionList.widgetDataMap = dataMap;
      const data = this.view.sgmQuestionList.data;
      const ObjData = [];
      for (var x in data){
        const toggleAnswerData = {
          "btnFlxContainerQuestion": {"onClick": this.selectingCheck.bind(this)},
          "btnArrow": {"onClick": this.selectingCheck.bind(this)},
          //Question text
          "lblQuestionTitle": data[x].lblQuestionTitle,
          //Answer text
          "lblAnswer": data[x].lblAnswer,
          "rTextDescription":data[x].rTextDescription,
          id_Position: x,
          "IDTypeItem": "normalItem",
          "flxContainerAnswer": {"isVisible": false},
        };
        toggleAnswerData.btnArrow.accessibilityConfig = {
          "a11yLabel" : "Button Down Arrow. Press enter to open answer for "+ data[x].lblQuestionTitle,
          "a11yHidden" : false
        };
        ObjData.push(toggleAnswerData);
      }
//       const dataWithToggleFunctionality = data.map((row) => {

//         return Object.assign({}, row, toggleAnswerData);
//       });
      this.view.sgmQuestionList.setData(ObjData);
    },

    //------------------------------------------------------------------------------
    //------------------------------------------------------------------------------
    selectingCheck:function(eventObject, context){
      var rowIndex = this.isAndroid() ? Number(this.view.sgmQuestionList.selectedRowIndex[1]) : Number(context.rowIndex);

      const data = this.view.sgmQuestionList.selectedRowItems[0];
      const isVisibleAnswer = data.flxContainerAnswer.isVisible;
      const question = data.lblQuestionTitle;
      data.flxContainerAnswer.isVisible = !isVisibleAnswer;
      data.btnArrow.skin = !isVisibleAnswer ? "btnNormalImageUpCss" : "btnNormalImageDownCss";
      
      data.btnArrow.accessibilityConfig = {
        "a11yLabel" : !isVisibleAnswer ? "Button Up Arrow. Press enter to close answer for "+ question  : "Button Down Arrow. Press enter to open answer for "+ question,
        "a11yHidden" : false
      };
      this.view.sgmQuestionList.setDataAt(data, rowIndex, 0);
      this.view.forceLayout();
    },
    isAndroid:function() {
      var deviceInfo = kony.os.deviceInfo();
      if (deviceInfo["name"] == "android") {
        return true;
      } else {
        return false;
      }
    },
    collapseQuestions: function() {
      const collapsedQuestions = this.view.sgmQuestionList.data;
      collapsedQuestions.forEach(function(question){
        if(question.btnArrow){
          question.btnArrow.skin = 'btnNormalImageDownCss';
        }
        if(question && question["flxContainerAnswer"])
        question["flxContainerAnswer"]['isVisible'] = false;
      });
      this.view.sgmQuestionList.data = collapsedQuestions;
    },
    changingTemplate:function(isMobile){
      var selTemplate = isMobile?'flxmpSgmQuestionMobile':'flxmpSgmQuestion';
      var dataMap = {
        "btnFlxContainerQuestion": "btnFlxContainerQuestion",
        "btnFlxDownIndicator": "btnFlxDownIndicator",
        "flxContainerAnswer": "flxContainerAnswer",
        "lblQuestionTitle": "lblQuestionTitle",
        "rTextDescription":"rTextDescription",
        "btnArrow": "btnArrow",
        "lblAnswer": "lblAnswer",
      };
      if(this.view.sgmQuestionList.rowTemplate !== selTemplate){
        this.view.sgmQuestionList.widgetDataMap = dataMap;
        var prevData = this.view.sgmQuestionList.data;
        this.view.sgmQuestionList.rowTemplate = selTemplate;
        this.view.sgmQuestionList.data = prevData;
      }
    },
    breakPointChange:function(widthVal){
      if(widthVal <= 1024 && widthVal >= 900 ){
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        this.changingTemplate(false);
        
      } if(widthVal <= 900 && widthVal >= 768 ){
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        this.changingTemplate(false);
        
      } if(widthVal <= 720 ){
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold33px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        this.changingTemplate(true);
        
      } if(widthVal > 1024){
        this.view.lblTitle.skin = 'lblFont700017OpenSansSemiBold38px';
        this.view.lblDescription.skin = 'lblFont000000OpenSansRegular16px';
        this.changingTemplate(false);
        
      }
      this.view.forceLayout();
    }
  };
});