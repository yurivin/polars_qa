import { formatData } from './supportFunctions';
import ApiService from './api_service';

class LandingPage {


    selectUserAccount() {
      cy.get('div.account_selector > div > div > i').click();
      return cy.xpath('.//span[contains(text(), "EVE")]').click();
    }

    clickDOTAsset(){
        return cy.xpath('.//div[@class="assetsTableWrapper"]/div[@class="assetRow"]/div[contains(text(), "DOT")]').click();
    }



  checkUserWalletKSM(balanceUI){
    const { api } = ApiService;
    api.query.tokens.accounts("5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw",{UnderlyingAsset: 'KSM'}).then((obj) =>{
      let walletBalanceUI = parseFloat(balanceUI);
      let userWalletBalance_API = formatData(obj.free);
      console.log(userWalletBalance_API);
      expect(userWalletBalance_API).to.contain(walletBalanceUI);
      return userWalletBalance_API;
    })
  }

  checkUserSuppliedDOT(totalSuppliedDOT){
    const { api } = ApiService;
    api.rpc.controller.getUserUnderlyingBalancePerAsset("5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw",{UnderlyingAsset: 'DOT'}).then((obj) =>{
      let totalSuppliedUI = parseFloat(totalSuppliedDOT);
      let userSuppliedDOT = formatData(obj.amount);
      console.log(userSuppliedDOT);
     //expect(userSuppliedDOT).to.contain(totalSuppliedUI);
    })
  }

  checkUserBorrowedDOT(totalBorrowedDOT){
    const { api } = ApiService;
    api.rpc.controller.getUserBorrowPerAsset("5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw",{UnderlyingAsset: 'DOT'}).then((obj) =>{
      let totalBorrowedUI = parseFloat(totalBorrowedDOT);
      let userBorrowedDOT = formatData(obj.amount);
      console.log(userBorrowedDOT);
     // expect(userBorrowedDOT).to.contain(totalBorrowedUI);
    })
  }

  clickKSMAsset(){
      return cy.xpath('.//div[@class="assetsTableWrapper"]/div[@class="assetRow"]/div[contains(text(), "KSM")]').click();
  }

}
export default LandingPage;