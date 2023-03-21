import { LightningElement,api } from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets'

export default class PortfolioUserStats extends LightningElement {
    badgePic
    @api rank;
    @api badges;
    @api points;
    @api trails;
    @api certifications;
    @api copadoCertifications;
    @api vlocityCertifications;

    
    renderedCallback(){
        if(this.rank){
            let url = `${PortfolioAssets}/PortfolioAssets/Ranks/${this.rank}.png`;
            this.badgePic = url;

        }
    }

   
      

}