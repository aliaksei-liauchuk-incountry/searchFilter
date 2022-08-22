public with sharing class SearchContactController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [
            SELECT FirstName, LastName, Email, MobilePhone, Account.Name, CreatedDate 
            FROM Contact 
            LIMIT 100
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> searchContacts(String searchKey) {
        searchKey = searchKey.trim();
        if (searchKey == '') {
            return getContacts();
        }
        searchKey = '%' + searchKey + '%';
        return [
            SELECT FirstName, LastName, Email, MobilePhone, Account.Name, CreatedDate 
            FROM Contact 
            WHERE Name LIKE :searchKey
            LIMIT 100
        ];
    }
}