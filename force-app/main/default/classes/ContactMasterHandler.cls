public with sharing class ContactMasterHandler {
    public void createContactRelationRecords(List<Contact> contacts){
        System.debug('contacts'+contacts);
        List<Contact_Relationship__c> contactRelationList = new List<Contact_Relationship__c>();
        for (Contact cons : contacts) {
            if(cons.Contact_Relationship__c){
                Contact_Relationship__c contactRelation = new Contact_Relationship__c();
                contactRelation.Name = cons.LastName;
                contactRelation.Contact_Relation__c = cons.Id;
                contactRelationList.add(contactRelation);
            }
        }
        insert contactRelationList;

    }
}