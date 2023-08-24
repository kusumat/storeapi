define(function () {
  var StoreKeys = {
    LISTS		: "lists",
    LISTGROUPS	: "listgroups",
    LISTITEMS	: "listitems",
    PRODUCTS	: "products",
  };
  var storeUtil = {
    setItem : function(key, value) {
      kony.store.setItem(key, JSON.stringify(value));
    },
    getItem : function(key) {
      var o = kony.store.getItem(key);
      if (o) {
        return JSON.parse(o);
      }else {
        return null;
      }
    },
    removeItem : function(key) {
      kony.store.removeItem(key);
    },
    setVariable : function(key,value){
      collectionStore[key] = JSON.stringify(value);
    },
    getVariable : function(key) {
      var o = collectionStore[key];
      if (o) {
        return JSON.parse(o);
      }else {
        return null;
      }
    },
    removeVariable : function(key) {
      delete collectionStore[key];
    }
  };
  var ListStore = {
    getAllLists : function(){
      return storeUtil.getItem(StoreKeys.LISTS);
    },
    storeAllLists : function (lists){
      storeUtil.setItem(StoreKeys.LISTS, lists);
    },
    getListByListId : function(listId){
      var lists = this.getAllLists();
      for (var index = 0; index < lists.length; index++) { 
        listId = kony.sdk.util.toNumber(listId);
        var tmpId = kony.sdk.util.toNumber(lists[index].listId);
        if( tmpId === listId){
          return lists[index];
        }
      }
    },
    getShoppingListData : function(){
      var shoppingList = [];
      var lists = this.getAllLists();
      for (var index = 0; index < lists.length; index++) { 
        shoppingList.push({
          "listId":lists[index].listId,
          "listName":lists[index].listName,
          "productCount": 10//GroupStore.getListItemCount(lists[index].listId)
        });
      }
      return shoppingList;
    }
  };
  var GroupStore = {
    _listItemsIds : null,
    getAllGroups : function(){
      return storeUtil.getItem(StoreKeys.LISTGROUPS);
    },
    storeAllGroups : function (groups){
      storeUtil.setItem(StoreKeys.LISTGROUPS, groups);
    },
    getGroupByGroupId : function(groupId){
      var groups = this.getAllGroups();
      for (var index = 0; index < groups.length; index++) { 
        groupId = kony.sdk.util.toNumber(groupId);
        var tmpId = kony.sdk.util.toNumber(groups[index].groupId);
        if( tmpId === groupId){
          return groups[index];
        }
      }
    },
    getListItemCount : function(listId){
      var groups = this.getAllGroups();
      var totalCount = 0;
      for (var index = 0; index < groups.length; index++) { 
        listId = kony.sdk.util.toNumber(listId);
        var tmpId = kony.sdk.util.toNumber(groups[index].listId);
        if(tmpId === listId){
          totalCount += groups[index].listItemIds.length;
        }
      }
      return totalCount;
    }
  };
  var ListItemStore = {
    getAllListItems : function(){
      return storeUtil.getItem(StoreKeys.LISTITEMS);
    },
    storeAllListItems : function (listItems){
      storeUtil.setItem(StoreKeys.LISTITEMS, listItems);
    },
    getListItemByListItemId : function(listItemId){
      var listItems = this.getAllListItems();
      for (var index = 0; index < listItems.length; index++) { 
        listItemId = kony.sdk.util.toNumber(listItemId);
        var tmpId = kony.sdk.util.toNumber(listItems[index].listItemId);
        if( tmpId === listItemId){
          return listItems[index];
        }
      }
    },
    getItemNoByListItemId : function(listItemId){
      var listItems = this.getAllListItems();
      for (var index = 0; index < listItems.length; index++) { 
        listItemId = kony.sdk.util.toNumber(listItemId);
        var tmpId = kony.sdk.util.toNumber(listItems[index].listItemId);
        if( tmpId === listItemId){
          return listItems[index].listNumber;
        }
      }
    }
  };
  return {
    getAllLists 			: ListStore.getAllLists,
    storeAllLists 			: ListStore.storeAllLists,
    getListByListId 		: ListStore.getListByListId,
    getShoppingListData		: ListStore.getShoppingListData,
    getAllGroups 			: GroupStore.getAllGroups,
    storeAllGroups 			: GroupStore.storeAllGroups,
    getGroupByGroupId 		: GroupStore.getGroupByGroupId,
    getAllListItems 		: ListItemStore.getAllListItems,
    storeAllListItems 		: ListItemStore.storeAllListItems,
    getListItemByListItemId : ListItemStore.getListItemByListItemId,

  };
});