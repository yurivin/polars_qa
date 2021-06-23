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

  checkUserWalletDOT(balanceUI){
    const { api } = ApiService;
    api.query.tokens.accounts("5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw",{UnderlyingAsset: 'DOT'}).then((obj) =>{
      let userWalletBalanceDOT = formatData(obj.free);
      console.log(userWalletBalanceDOT);
      //expect(userWalletBalanceDOT).to.contain(balanceUI);
    })
  }

  checkUserSuppliedDOT(totalSuppliedDOT){
    const { api } = ApiService;
    api.rpc.controller.getUserUnderlyingBalancePerAsset("5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw",{UnderlyingAsset: 'DOT'}).then((obj) =>{
      let userSuppliedDOT = formatData(obj.free);
      console.log(userSuppliedDOT);
      expect(userSuppliedDOT).to.contain(totalSuppliedDOT);
    })
  }

  checkUserBorrowedDOT(totalBorrowedDOT){
    const { api } = ApiService;
    api.rpc.controller.getUserBorrowPerAsset("5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw",{UnderlyingAsset: 'DOT'}).then((obj) =>{
      let userBorrowedDOT = formatData(obj.free);
      console.log(userBorrowedDOT);
      expect(userBorrowedDOT).to.contain(totalBorrowedDOT);
    })
  }

}
export default LandingPage;