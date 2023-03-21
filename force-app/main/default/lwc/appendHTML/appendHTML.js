import { api,LightningElement } from 'lwc';

export default class AppendHTML extends LightningElement {

    _result;
    loaded = false;

    @api get result(){
        return this._result
    }

    set result(data){
     this._result = data;
     if(this.loaded){
        this.attachHtml()
     }
    }

    renderedCallback(){
        if(!this.loaded && this.result){
            this.attachHtml();
        }
    }
    attachHtml(){
        const container = this.template.querySelector('.container');
        if(container){
            container.innerHTML = this.result
        }
        this.loaded = true;
    }

}