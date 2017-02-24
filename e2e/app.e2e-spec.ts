import { TaxiTravelPage } from './app.po';

describe('taxi-travel App', () => {
  let page: TaxiTravelPage;

  beforeEach(() => {
    page = new TaxiTravelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
