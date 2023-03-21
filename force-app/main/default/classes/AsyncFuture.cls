//Future method

public with sharing class AsyncFuture {
    @Future
    public static void futureMethodAsync(List<Id> contactIds){
        System.debug('In Future method!');
        List<Contact> contactToUpdated = new List<Contact>();
        for(Contact contact : [SELECT ID,Name,Email FROM Contact WHERE Id IN :contactIds]){
            contact.Email = 'future@gmail123.com';
            contactToUpdated.add(contact);
        
        }
    if(contactToUpdated.size()>0 && !contactToUpdated.isEmpty()){
        Database.update(contactToUpdated,false);
    }

    }
}