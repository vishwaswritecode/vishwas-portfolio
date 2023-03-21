// trigger HelloWorldTrigger on Account (before insert) {
//     for(Account a : Trigger.New){
//         a.description = 'new description!';        
//     }
// }

trigger HelloWorldTrigger on Account(before insert,before update){
    set<Id> ownerIdSet = new set<Id>();
    for (Account Acc : Trigger.new){
        ownerIdSet.add(Acc.ownerId);
    }
    System.debug('set'+ownerIdSet);
    Map<Id,User> userMap = new Map<Id,User>([Select Name From User WHERE Id IN :ownerIdSet]);
    for(Account Acc : Trigger.new){
        User usr = userMap.get(Acc.ownerId);
        Acc.SalesRep__c  = usr.Name;

    }

}