@isTest
private class SearchContactControllerTest {

	@testSetup
	static void createContacts() {
		List<Contact> contacts = new List<Contact>();
		for (Integer i = 0; i < 10; i++) {
		contacts.add(new Contact(FirstName='Peter', LastName='Goldwin' + i));
		}
		insert contacts;
	}

	@isTest
	static void testGetContacts() {
		List<Contact> newContacts = [
			SELECT FirstName, LastName, Email, MobilePhone, Account.Name, CreatedDate 
			FROM Contact];
		Test.startTest();
		List<Contact> returnedContacts = SearchContactController.getContacts();
		Test.stopTest();
		System.assertEquals(newContacts, returnedContacts, 'Contacts were not received');
		System.assert(returnedContacts.size() == 10, 'Was expecting to find ten contact');
	}

	@isTest
	static void testSearchContacts() {
		List<Contact> newContacts = [
			SELECT FirstName, LastName, Email, MobilePhone, Account.Name, CreatedDate 
			FROM Contact];
		Test.startTest();
		List<Contact> returnedContacts = SearchContactController.searchContacts('5');
		Test.stopTest();
		System.assert(returnedContacts.size() > 0, 'Was expecting to find at least one contact');
	}

	@isTest
	static void testReturnGetContacts() {
		List<Contact> newContacts = [
			SELECT FirstName, LastName, Email, MobilePhone, Account.Name, CreatedDate 
			FROM Contact];
		Test.startTest();
		List<Contact> returnedContacts =  SearchContactController.searchContacts('');
		Test.stopTest();
		System.assertEquals(newContacts, returnedContacts, 'Contacts were not received');
		System.assert(returnedContacts.size() == 10, 'Was expecting to find ten contacts');
	}

	@isTest
	static void testWrongSearchContacts() {
		List<Contact> newContacts = [
			SELECT FirstName, LastName, Email, MobilePhone, Account.Name, CreatedDate 
			FROM Contact];
		Test.startTest();
		List<Contact> returnedContacts =  SearchContactController.searchContacts('&*');
		Test.stopTest();
		System.assert(returnedContacts.size() == 0, 'Was expecting to find no contacts');
	}

	@isTest
	static void testNegativeGetContacts() {
		List<Contact> contacts = [
			SELECT FirstName, LastName, Email, MobilePhone, Account.Name, CreatedDate 
			FROM Contact];
		delete contacts;
		Test.startTest();
		Boolean isException = true;
		try {
		SearchContactController.getContacts();
		} catch (Exception e) {
			if (e.getMessage().contains('Contacts are empty')) {
			isException = true;
			}
		}
		Test.stopTest();
		System.assert(isException, 'Contact should have thrown an exception');
	}
}