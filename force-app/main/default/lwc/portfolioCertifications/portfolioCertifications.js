import { LightningElement,api,wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import SF_CERT from '@salesforce/schema/Portfolio__c.Salesforce_Certifications__c';
import SF_DEVOPS_CERT from '@salesforce/schema/Portfolio__c.Salesforce_Devops_Certifications__c'
import OTHER_CERT from '@salesforce/schema/Portfolio__c.Other_Certifications__c'
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets'

export default class PortfolioCertifications extends LightningElement {
      @api recordId = 'a045g00000D4axfAAB';
     
      certLogo = `${PortfolioAssets}/PortfolioAssets/cert_logo.png`
      copadoLogo = `${PortfolioAssets}/PortfolioAssets/copado.png`
      otherCertiLogo = `${PortfolioAssets}/PortfolioAssets/certi.png`


      sfcertiList = [];
      sfDevopsCertiList = [];
      otherCertiList = [];

      @wire(getRecord, { recordId: '$recordId', fields: [SF_CERT,SF_DEVOPS_CERT,OTHER_CERT]})
      certificationsData({data,error}){
        if(data){
            console.log('certifications data',data);
            this.salesforceCertiHandler(data);
            this.otherCertificationsHandler(data);
        }
        if(error){
            console.log('error',error);
        }
      }

      salesforceCertiHandler(data){
        const {Salesforce_Certifications__c,Salesforce_Devops_Certifications__c} =  data.fields;
        let sfCertifications = Salesforce_Certifications__c.value;
        let sfDevopsCertifications = Salesforce_Devops_Certifications__c.value;
        this.sfcertiList = sfCertifications? sfCertifications.split(';') : [];
        this.sfDevopsCertiList = sfDevopsCertifications? sfDevopsCertifications.split(';') :[];

      }

      otherCertificationsHandler(data){
        const {Other_Certifications__c} =  data.fields;
        let otherCertifications = Other_Certifications__c.value;
        this.otherCertiList = otherCertifications? otherCertifications.split(';'):[];


      }

}