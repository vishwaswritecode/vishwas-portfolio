trigger ContactTrigger on Contact (after insert) {
    if(trigger.isAfter){
        if(trigger.isinsert){
            ContactMasterHandler contactHandler = new ContactMasterHandler();
            contactHandler.createContactRelationRecords(Trigger.new);
        }
    }
}