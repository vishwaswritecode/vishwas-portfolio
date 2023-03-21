import { LightningElement, wire } from 'lwc';
import createNote from '@salesforce/apex/NoteTakingController.createNote'
import getNotes from '@salesforce/apex/NoteTakingController.getNotes'
import updateNotes from '@salesforce/apex/NoteTakingController.updateNotes'
import deleteNotes from '@salesforce/apex/NoteTakingController.deleteNotes'
import LightningConfirm from 'lightning/confirm';


import {refreshApex} from '@salesforce/apex'

const DEFAULT_NOTE_FORM = {
    Name: "",
    Note_Description__c: ""
}

export default class NoteTakingApp extends LightningElement {

    showModal = false;
    newRecord = DEFAULT_NOTE_FORM;
    noteList = [];
    wireNoteResult;
    selectedrecordId;

    get isFormInvalid(){
        return !(this.newRecord && this.newRecord.Note_Description__c && this.newRecord.Name)
    }
    @wire(getNotes)
    noteListInfo(result){
        this.wireNoteResult = result;
        const {data,error} = result
        if(data){
            console.log('data',data);
            this.noteList = data.map((item) => {
                let formattedDate = new Date(item.LastModifiedDate).toDateString();
                return {...item,formattedDate}
            })
            
        }
        if(error){
            console.log('error',error);
            element.showToastMsg(error.message.body,'error');

        }
    }
    
    createNoteHandler(){
        this.showModal = true;
    }


    closeModal(){
        this.showModal = false;
        this.newRecord = DEFAULT_NOTE_FORM;
        this.selectedrecordId = null;
    }

    changeHandler(event){
        const {name,value} = event.target;
        this.newRecord = {...this.newRecord,[name]:value};
        console.log(" this.newRecord -->", this.newRecord )

    }

    formSaveHandler(event){
        event.preventDefault();
        console.log("newRecord-->",this.newRecord);
        // this.showModal = false;
        if(this.selectedrecordId){
            this.updateNote(this.selectedrecordId);
        }else{
            this.createNote();
        }
        this.closeModal();
        

    }

    createNote(){
        createNote({title:this.newRecord.Name,descrption:this.newRecord.Note_Description__c})
        .then((result) => {
            console.log("result",result);
            this.selectedrecordId = null;

            this.fireToastEvent('Note Created Successfully','success');
            this.refresh();

        })
        .catch((error)=>{
            console.error("error",error);
            this.fireToastEvent(error,'error');
        })
    }
    fireToastEvent(message,variant){
        let element = this.template.querySelector('c-notification');
        console.log('element',element);
        if(element){
            element.showToastMsg(message,variant);
        }
    }

    refresh(){
        console.log('refresh data',refreshApex(this.wireNoteResult))
        return refreshApex(this.wireNoteResult);
    }

    editNotes(event){
       const recordid = event.target.dataset.recordid;
       const noterecord = this.noteList.find(item => item.Id === recordid);
       
       this.newRecord = {
            Name: noterecord.Name,
            Note_Description__c: noterecord.Note_Description__c
        }
        this.selectedrecordId = recordid;
        this.showModal = true;
        //this.closeModal();

    }

    updateNote(noteId){
        console.log('updateNote newRecord-->',this.newRecord)
        const {Name,Note_Description__c} = this.newRecord;
        console.log('title:',Name);
        console.log('descrption:',Note_Description__c);
        updateNotes({noteId:noteId,title:Name,description:Note_Description__c})
        .then((result)=>{
            //this.showModal = false;
            this.selectedrecordId = null;
            this.fireToastEvent('Note Updated Successfully','success');
            this.refresh();

        })
        .catch((error)=>{
            console.log('error',error);
        })
        this.closeModal();
    }
    deleteNotes(event){
        this.selectedrecordId = event.target.dataset.recordid;
        this.deleteHandler();
    }

    async deleteHandler(){
        const result = await LightningConfirm.open({
            message: 'Are you want to delete this note?',
            variant: 'headerless',
            label: 'Confirm',
        });
        if(result){
            deleteNotes({noteId:this.selectedrecordId})
            .then((result) => {
                this.selectedrecordId = null;
                this.fireToastEvent('Note Deleted Successfully','success');
                this.refresh();
    
            })
            .catch((error) => {
                this.fireToastEvent(error,'error');
    
            })
        }
        this.closeModal();
    }
    
}