public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> allContacts() {
          return [          	
                 SELECT FirstName, LastName, Email, MobilePhone, Account.Name, CreatedDate 
                 FROM Contact 
                 ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> searchContacts(String searchKey) {
          searchKey = searchKey.trim();
         if (searchKey == '') {
             return allContacts();
         }
         searchKey = '%' + searchKey + '%';
         return [
                 SELECT FirstName, LastName, Email, MobilePhone, Account.Name, CreatedDate 
                 FROM Contact WHERE Name LIKE :searchKey
                ];
    }
 }