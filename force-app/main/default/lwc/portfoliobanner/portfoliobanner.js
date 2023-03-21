import { LightningElement,wire,api} from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets'
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import FULLNAME from '@salesforce/schema/Portfolio__c.FullName__c'
import DESIGNATION from '@salesforce/schema/Portfolio__c.Designation__c'
import COMPANY_NAME from '@salesforce/schema/Portfolio__c.CompanyName__c'
import COMPANY_LOCATION from '@salesforce/schema/Portfolio__c.CompanyLocation__c'


export default class Portfoliobanner extends LightningElement {
    
    @api linkedInUrl 
    //= 'https://www.linkedin.com/in/vishwas-j-733375140/';
    @api gitHubUrl 
    //= 'https://github.com/vishwaswritecode';
    @api trailHeadUrl 
    //= 'https://trailblazer.me/id/vishwasjyothula';

    userPic =  `${PortfolioAssets}/PortfolioAssets/03.jpg`;
    linkedInPic = `${PortfolioAssets}/PortfolioAssets/Social/linkedin.svg`;
    gitHubPic = `${PortfolioAssets}/PortfolioAssets/Social/github.svg`;
    trailHeadPic =  `${PortfolioAssets}/PortfolioAssets/Social/trailhead1.svg`;

    @api recordId 
    //= 'a045g00000D4axfAAB';

    @wire(getRecord,{recordId:'$recordId',fields:[FULLNAME,COMPANY_NAME,COMPANY_LOCATION,DESIGNATION]})
    portfolioData

    get fullName(){
        return getFieldValue(this.portfolioData.data,FULLNAME)
    }
    get designation(){
        return getFieldValue(this.portfolioData.data,DESIGNATION)
    }
    get companyName(){
        return getFieldValue(this.portfolioData.data,COMPANY_NAME)
    }
    get companyLocation(){
        return getFieldValue(this.portfolioData.data,COMPANY_LOCATION)
    }

    /**
     *     ({data,error}){
        if(data){
            console.log('data',JSON.stringify(data))
        }
        if(error){
            console.log('error',error);
        }
    }
     */


}