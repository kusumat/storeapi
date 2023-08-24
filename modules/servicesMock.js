//Type your code here

var _getLists = {
  "lists": [{"listId":"1005049",
             "listName" : "My List A4",
             "productCount": 5
            }  ,
            {"listId":"2020",
             "listName" : "Test Name",
             "productCount": 2
            },
            {"listId":"2021",
             "listName" : "Test Name",
             "productCount": 2
            },
            {"listId":"2022",
             "listName" : "Test Name",
             "productCount": 2
            },
            {"listId":"1002",
             "listName" : "Test Name",
             "productCount": 2
            },
            {"listId":"2",
             "listName" : "Test Name",
             "productCount": 2
            },
            {"listId":"1005335",
             "listName" : "Sprint 5 List A",
             "productCount": 10
            },
            {"listId":"1005344",
             "listName" : "Panamax - Testing 11/21 - C" ,
             "productCount": 0 
            } 
           ]};



function getCreateOrderMock(){
  var createOrder = {
    "groups": [
      {
        "listGroupId": 1,
        "groupName": "Group One",
        "groupSequenceNumber": 1,
        "listItems": [
        ]
      }
    ]
  }; 
  for(var i=0; i<1000; i++){
    var url = "https://picsum.photos/seed/"+i+"/300";
    var productData = {
      "listItemId": 1,
      "listId": i,
      "groupId": 1,
      "itemNumber": 123457,
      "itemSequenceNumber": 1,
      "product":{
        "_id": "5fb603604942d400117ddc23",
        "createdDate": "2020-11-19T05:32:16.724Z",
        "updatedDate": "2020-11-25T19:31:45.127Z",
        "distributorNumber": 6026,
        "productNumber": 1,
        "activeIndicator": "Y",
        "brand": "USF Brand",
        "caseUnitOfMeasure": "EA",
        "descriptionText": "Cheese Mozzarella Breaded Italian Stick",
        "displayDescriptionText": "Cheese Mozzarella Breaded Italian Stick",
        "eachConversionFactor": 1,
        "eachUnitOfMeasure": "EA",
        "effectiveDate": "",
        "image": url,
        "imageAvailable": true,
        "manufaturerName": "Molly’s Kitchen",
        "manufaturerProductNumber": "test",
        "netWeight": 20,
        "nonFoodProduct": false,
        "orderable": true,
        "packSize": "1 LBA",
        "pimClassCode": 15,
        "pimClassCodeDescription": "test pim class code",
        "priceUnitOfMeasure": "LBA",
        "productIcon": {
          "cashAndCarry": true,
          "cashAndCarryIndicator": "Y",
          "catchWeight": false,
          "cmaIconDescription": "test",
          "cmaIconImagePath": "test",
          "cmaIconText": "test",
          "discontinued": false,
          "dwo": false,
          "justInTime": false,
          "locallySourced": false,
          "purchasedFromVendor": 0,
          "specialVendor": true,
          "vendorShipIcon": "test",
          "vendorShipIndicator": "test",
          "vendorShipLeadTime": 0
        },
        "productState": 1,
        "productStateDescription": "test description",
        "productStatusIndicator": "test",
        "replacementProductNumber": 10,
        "substituteProductNumber": 20,
        "willBreak": false
      }
    };
    createOrder.groups[0].listItems.push(productData);
  }
  return createOrder;
}

var _segData = {
  "groups": [
    {
      "listGroupId": 1,
      "groupName": "group One",
      "groupSequenceNumber": 2,
      "listItems": [
        {
          "listItemId": 1,
          "listId": 2,
          "groupId": 1,
          "itemNumber": 123457,
          "itemSequenceNumber": 1,
          "product":{
            "_id": "5fb603604942d400117ddc23",
            "createdDate": "2020-11-19T05:32:16.724Z",
            "updatedDate": "2020-11-25T19:31:45.127Z",
            "distributorNumber": 6026,
            "productNumber": 1,
            "activeIndicator": "Y",
            "brand": "USF Brand",
            "caseUnitOfMeasure": "EA",
            "descriptionText": "Testing",
            "displayDescriptionText": "Rowdata Test",
            "eachConversionFactor": 1,
            "eachUnitOfMeasure": "EA",
            "effectiveDate": "",
            "image": "string",
            "imageAvailable": true,
            "manufaturerName": "test",
            "manufaturerProductNumber": "test",
            "netWeight": 20,
            "nonFoodProduct": false,
            "orderable": true,
            "packSize": "1 lb",
            "pimClassCode": 15,
            "pimClassCodeDescription": "test pim class code",
            "priceUnitOfMeasure": "lb",
            "productIcon": {
              "cashAndCarry": true,
              "cashAndCarryIndicator": "Y",
              "catchWeight": false,
              "cmaIconDescription": "test",
              "cmaIconImagePath": "test",
              "cmaIconText": "test",
              "discontinued": false,
              "dwo": false,
              "justInTime": false,
              "locallySourced": false,
              "purchasedFromVendor": 0,
              "specialVendor": true,
              "vendorShipIcon": "test",
              "vendorShipIndicator": "test",
              "vendorShipLeadTime": 0
            },
            "productState": 1,
            "productStateDescription": "test description",
            "productStatusIndicator": "test",
            "replacementProductNumber": 10,
            "substituteProductNumber": 20,
            "willBreak": false


          }},

      ]
    }
  ]
};  
