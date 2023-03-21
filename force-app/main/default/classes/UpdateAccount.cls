public with sharing class UpdateAccount {

    public static void updateAccounts(Id AccountId) {
        System.debug('in update class');
        List<Account> accounstToUpdated = new List<Account>();
        List<Account> acc = [SELECT ID,CountNoOfDeletions__c	FROM Account WHERE Id = :AccountId LIMIT 1];
        if(acc.size()>0){
            //Integer oldValue = acc[0].CountNoOfDeletions__c;
            //(acc[0].CountNoOfDeletions__c) + 1;
            acc[0].CountNoOfDeletions__c = 1;
            accounstToUpdated.add(acc[0]);
        }
        if(accounstToUpdated.size()>0){
            Database.DMLOptions dml = new Database.DMLOptions();
            dml.DuplicateRuleHeader.AllowSave = true; 
            //Account duplicateAccount = new Account(Name='dupe'); 
            List<Database.SaveResult> sr = Database.update(accounstToUpdated, dml); 
            // if (sr.isSuccess()) {   
            // System.debug('Duplicate account has been inserted in Salesforce!'); 
            // }
            //update accounstToUpdated;
        }
        
    }
}