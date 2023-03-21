trigger AccountTriggerhandler on Account (before delete) {
    //UpdateAccount accountInstance = new UpdateAccount();
    //List<Account> accountsToUpdated = new List<Account>();

    for(Account acc : Trigger.old){
        if(acc.Name == 'Vishwas'){
            //accountsToUpdated.add(Id);
            UpdateAccount.updateAccounts(acc.Id);
            acc.addError('Record cannot be deleted!');
        }

    }
    
}