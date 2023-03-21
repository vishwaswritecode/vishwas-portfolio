public without sharing class NoteTakingController {

    @AuraEnabled
    public static Boolean createNote(String title,String descrption){
        try {

            if(!String.isBlank(title)){
                My_Note__c myNote = new My_Note__c(Name = title,Note_Description__c = descrption);
                insert myNote;
                return true;

            }
            return false;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    

    @AuraEnabled(cacheable=true)
    public static List<My_Note__c> getNotes(){
        return [SELECT ID,Name,Note_Description__c,LastModifiedDate FROM My_Note__c];
        
    }
    
    @AuraEnabled
    public static Boolean updateNotes(String noteId,String title,String description){
        try {
            if(!String.isBlank(noteId)){
                System.debug('updateNotes noteId'+noteId);
                System.debug('updateNotes title'+title);
                System.debug('updateNotes description'+description);

                List<My_Note__c> getNotesLst = [SELECT ID,Name,Note_Description__c,LastModifiedDate FROM My_Note__c WHERE Id =: noteId];
                getNotesLst[0].Name = title;
                getNotesLst[0].Note_Description__c = description;
                update getNotesLst;
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Boolean deleteNotes(String noteId){
        try {
            if(!String.isBlank(noteId)){
                My_Note__c mynote = new My_Note__c(id=noteId);
                delete myNote;
                return true;
            }
            return false;
            
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}

// List<My_Note__c> getNotesLst = [SELECT ID,Name,Note_Description__c,LastModifiedDate FROM My_Note__c];
// delete getNotesLst;