define(function() {

	var frm;
  
  	return {
      constructor: function(baseConfig, layoutConfig, pspConfig) {
        this.view.flxBtnNavPage01.onClick= this.page1;
        this.view.flxBtnNavPage02.onClick= this.page2;
        this.view.flxBtnNavPage03.onClick= this.page3;
        this.view.flxBtnNavPage04.onClick= this.page4;
        this.view.flxBtnNavPage05.onClick= this.page5; 
      	this.view.flxBtnNavPagBack.onClick = this.back;
        this.view.flxBtnNavPageForward.onClick= this.forward;
      
        this.view.btnNumberNavPage01.onClick= this.page1;
        this.view.btnNumberNavPage02.onClick= this.page2;
        this.view.btnNumberNavPage03.onClick= this.page3;
        this.view.btnNumberNavPage04.onClick= this.page4;
        this.view.btnNumberNavPage05.onClick= this.page5; 
      	this.view.btnFirstPage.onClick = this.back;      
      	this.view.btnLastPage.onClick = this.forward;
      	amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);
        this.view.flxCntnrPaginationHeading.accessibilityConfig = {
          "a11yLabel" : "Appellant Paging",
          "a11yARIA":{"role":"heading", "aria-level":"1"},
          "a11yHidden" : false 
        };
      },
		//Logic for getters/setters of custom properties
    initGettersSetters: function() {

		},
      
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
       this.view.top='8px';
       this.view.height= '60px'; 
       this.view.layoutType = kony.flex.FLOW_VERTICAL;
       this.view.lblSubTiitleSugestDesc.centerY = 'Default';
       this.view.flxContainerNavPagination.left = '1px';
       this.view.flxBtnNavPage01.left = '6px';
       this.view.flxBtnNavPage02.left = '13px';
       this.view.flxBtnNavPage03.left = '13px';
       this.view.flxBtnNavPage04.left = '13px';
       this.view.flxBtnNavPage05.left = '13px';
       this.view.flxBtnNavPageDots.left  = '0px';
       this.view.flxBtnNavPageForward.left = '6px';
       try{
       this.view.flxContainerNavPagination.centerY = 'Default'; 
       } catch (e){}  
      }
      else {
        this.view.height= '50px'; 
        this.view.layoutType = kony.flex.FLOW_HORIZONTAL;
        this.view.lblSubTiitleSugestDesc.centerY = '50%';
        this.view.flxContainerNavPagination.centerY = '50%';
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },     
      
	setComponentData: function(form, loadAppellants) {
			this.frm = form;
      		this.frm.activeAppellantList =gblAppellantList;
      		if(loadAppellants)
      			this.updatePageRow(1, 1);
       	},
          
   	back:function(event){
        var page = 1;
		this.updatePageRow(1, page);
       }, 
      
   	forward:function(event){
        var page = 1;
      	var itemsPerPage= this.itemsPerPage();
      	var number_of_pages = window.Math.ceil(this.frm.activeAppellantList.length/itemsPerPage);
		this.updatePageRow(5, number_of_pages);
       }, 
      
	page1:function(event){
      var page = this.view.flxBtnNavPage01.btnNumberNavPage01.text;
      this.updatePageRow(1, page);
    },
      
	page2:function(event){
      var page = this.view.flxBtnNavPage02.btnNumberNavPage02.text;
      this.updatePageRow(2, page);
    },
      
	page3:function(event){
      var page = this.view.flxBtnNavPage03.btnNumberNavPage03.text;
      this.updatePageRow(3, page);
    },
      
	page4:function(event){
      var page = this.view.flxBtnNavPage04.btnNumberNavPage04.text;
      this.updatePageRow(4, page);
    },
      
	page5:function(event){
      var page = this.view.flxBtnNavPage05.btnNumberNavPage05.text;
      this.updatePageRow(5, page);
    },
      
	updatePageRow:function(pageRow, pages){
              
      	var page = window.parseInt(pages);
        var itemsPerPage= this.itemsPerPage();
      	var number_of_pages = window.Math.ceil(this.frm.activeAppellantList.length/itemsPerPage);
		this.frm.populateCards(this.frm.activeAppellantList.slice((page -1)*itemsPerPage, ((page -1)*itemsPerPage)+itemsPerPage));
        
        this.view.flxBtnNavPage01.skin= "slFbox";
        this.view.flxBtnNavPage01.btnNumberNavPage01.skin="sknBtnBlackBold16";
        this.view.flxBtnNavPage02.skin= "slFbox";
        this.view.flxBtnNavPage02.btnNumberNavPage02.skin="sknBtnBlackBold16";
        this.view.flxBtnNavPage03.skin= "sknFlxBlueHardRadiusArrow";
        this.view.flxBtnNavPage03.btnNumberNavPage03.skin="sknBtnFontFFFFFFSansProBold16px";
        this.view.flxBtnNavPage04.skin= "slFbox";
        this.view.flxBtnNavPage04.btnNumberNavPage04.skin="sknBtnBlackBold16";
        this.view.flxBtnNavPage05.skin= "slFbox";
        this.view.flxBtnNavPage05.btnNumberNavPage05.skin="sknBtnBlackBold16";
      
        this.view.flxBtnNavPagBack.skin="sknFlxBlueHardRadiusArrow";
      	this.view.flxBtnNavPageForward.skin="sknFlxBlueHardRadiusArrow";
        this.view.flxBtnNavPagBack.imgBack.src="arrow_left_white.png";
        this.view.flxBtnNavPageForward.imgForward.src="arrow_right_white.png";
        this.view.btnFirstPage.skin = 'sknBtnNormalLeftArrowWhite';
        this.view.btnLastPage.skin = 'sknBtnNormalRightArrowWhite';        
        
      this.view.flxBtnNavPage01.btnNumberNavPage01.text = page-2; 
      this.view.flxBtnNavPage02.btnNumberNavPage02.text = page-1; 
      this.view.flxBtnNavPage03.btnNumberNavPage03.text = page; 
      this.view.flxBtnNavPage04.btnNumberNavPage04.text = page+1; 
      this.view.flxBtnNavPage05.btnNumberNavPage05.text = page+2;
  
      if(page === window.Math.ceil(this.frm.activeAppellantList.length/itemsPerPage) | (page+1) === window.Math.ceil(this.frm.activeAppellantList.length/itemsPerPage)){
          this.view.flxBtnNavPage03.skin= "slFbox";
          this.view.flxBtnNavPage03.btnNumberNavPage03.skin="sknBtnBlackBold16";
       }
      
      	if((page+1) === window.Math.ceil(this.frm.activeAppellantList.length/itemsPerPage)){
          this.view.flxBtnNavPage01.btnNumberNavPage01.text = (page+1)-4; 
          this.view.flxBtnNavPage02.btnNumberNavPage02.text = (page+1)-3; 
          this.view.flxBtnNavPage03.btnNumberNavPage03.text = (page+1)-2; 
          this.view.flxBtnNavPage04.btnNumberNavPage04.text = (page+1)-1; 
          this.view.flxBtnNavPage05.btnNumberNavPage05.text = (page+1);   

          	if(page != 3){
          	this.view.flxBtnNavPage04.skin= "sknFlxBlueHardRadiusArrow";
            this.view.flxBtnNavPage04.btnNumberNavPage04.skin="sknBtnFontFFFFFFSansProBold16px";
            }
      	}
      
      	if(page === window.Math.ceil(this.frm.activeAppellantList.length/itemsPerPage)){
          this.view.flxBtnNavPage01.btnNumberNavPage01.text = page-4; 
          this.view.flxBtnNavPage02.btnNumberNavPage02.text = page-3; 
          this.view.flxBtnNavPage03.btnNumberNavPage03.text = page-2; 
          this.view.flxBtnNavPage04.btnNumberNavPage04.text = page-1; 
          this.view.flxBtnNavPage05.btnNumberNavPage05.text = page;   
          this.view.flxBtnNavPage05.skin= "sknFlxBlueHardRadiusArrow";
          this.view.flxBtnNavPage05.btnNumberNavPage05.skin="sknBtnFontFFFFFFSansProBold16px";
      	}
        
        	  
        if(page === 1 | page === 2 | number_of_pages < 5){
          this.view.flxBtnNavPage01.btnNumberNavPage01.text = 1; 
          this.view.flxBtnNavPage02.btnNumberNavPage02.text = 2; 
          this.view.flxBtnNavPage03.btnNumberNavPage03.text = 3; 
          this.view.flxBtnNavPage04.btnNumberNavPage04.text = 4; 
          this.view.flxBtnNavPage05.btnNumberNavPage05.text = 5; 
          
          if(page === 1 | page === 2){
            this.view.flxBtnNavPage03.skin= "slFbox";
        	this.view.flxBtnNavPage03.btnNumberNavPage03.skin="sknBtnBlackBold16";
          }
          if(page === 3){
            this.view.flxBtnNavPage03.skin= "sknFlxBlueHardRadiusArrow";
        	this.view.flxBtnNavPage03.btnNumberNavPage03.skin="sknBtnFontFFFFFFSansProBold16px";
          }
          if(page === 4){
            this.view.flxBtnNavPage04.skin= "sknFlxBlueHardRadiusArrow";
        	this.view.flxBtnNavPage04.btnNumberNavPage04.skin="sknBtnFontFFFFFFSansProBold16px";
          }          
        }

        if(page ===1){
          	this.view.flxBtnNavPage01.skin= "sknFlxBlueHardRadiusArrow";
          	this.view.flxBtnNavPage01.btnNumberNavPage01.skin="sknBtnFontFFFFFFSansProBold16px";
        }
        if(page ===2){
          	this.view.flxBtnNavPage02.skin= "sknFlxBlueHardRadiusArrow";
          	this.view.flxBtnNavPage02.btnNumberNavPage02.skin="sknBtnFontFFFFFFSansProBold16px";
        }
      
        var screenWidth = kony.os.deviceInfo().screenWidth;
      
      	if(this.frm.activeAppellantList.length < 1) {
      		this.frm.view.lblSubTiitleSugestDesc.text = "No search results found. ";
            
          	if(screenWidth <= gblBreakPoint) {
              this.frm.view.flxContainerBody.height = '59%';
            }
           	else {
              this.frm.view.flxContainerBody.height = '72.5%';  
            }
        	this.frm.view.mainPaginationForm.setVisibility(false);
        }
      	else {
            this.frm.view.lblSubTiitleSugestDesc.text = "You can request a hearing in a few quick and easy steps. ";
          	if(screenWidth <= gblBreakPoint) {
              this.frm.view.flxContainerBody.height = '80%';
            }
           	else {
              this.frm.view.flxContainerBody.height = '90%';  
            }
        	this.frm.view.mainPaginationForm.setVisibility(false);
	        this.frm.view.mainPaginationForm.setVisibility(true);
		}
      
      
       	this.view.flxBtnNavPageDots.setVisibility(true);
     	this.view.flxBtnNavPage05.setVisibility(true);
        this.view.flxBtnNavPage04.setVisibility(true);   
        this.view.flxBtnNavPage03.setVisibility(true); 
        this.view.flxBtnNavPage02.setVisibility(true); 
      	this.view.flxBtnNavPagBack.setVisibility(true); 
      	this.view.flxBtnNavPageForward.setVisibility(true); 
            

      	if(number_of_pages ===1){
      	this.view.flxBtnNavPagBack.skin="slFbox";
      	this.view.flxBtnNavPageForward.skin="slFbox";
        this.view.flxBtnNavPagBack.imgBack.src="arrow_left.png";
        this.view.flxBtnNavPagBack.imgBack.setVisibility(true);
        this.view.flxBtnNavPageForward.imgForward.src="arrow_right.png";
        this.view.flxBtnNavPageForward.imgForward.setVisibility(true);
        this.view.btnFirstPage.setVisibility(false);
        this.view.btnLastPage.setVisibility(false);
      	}
      
      if(window.parseInt(this.view.flxBtnNavPage05.btnNumberNavPage05.text) === number_of_pages){
        this.view.flxBtnNavPageDots.setVisibility(false);
      	this.view.flxBtnNavPageForward.skin="slFbox";
        this.view.flxBtnNavPageForward.imgForward.src="arrow_right.png";
        this.view.flxBtnNavPageForward.imgForward.setVisibility(true);
        this.view.btnLastPage.setVisibility(false);
      }  
      if(page === number_of_pages)
        this.view.flxBtnNavPageDots.setVisibility(false);
      if(number_of_pages <= 5)
        this.view.flxBtnNavPageDots.setVisibility(false);
      if(number_of_pages <= 4)
        this.view.flxBtnNavPage05.setVisibility(false);
      if(number_of_pages <= 3)
        this.view.flxBtnNavPage04.setVisibility(false);   
      if(number_of_pages <= 2)
        this.view.flxBtnNavPage03.setVisibility(false); 
      if(number_of_pages <= 1)
        this.view.flxBtnNavPage02.setVisibility(false); 
      
      
      var current_page_Index = ((page -1)*itemsPerPage)+1;
      var current_page_lastIndex = ((page -1)*itemsPerPage)+itemsPerPage;
      
      if(current_page_lastIndex > this.frm.activeAppellantList.length)
   		current_page_lastIndex = this.frm.activeAppellantList.length;
      this.view.lblSubTiitleSugestDesc.text="Showing "+current_page_Index+" to "+current_page_lastIndex+" of "+this.frm.activeAppellantList.length;
      this.view.forceLayout();
      },
      
       itemsPerPage:function(){
    	return 12;
  		}
      
	};
});