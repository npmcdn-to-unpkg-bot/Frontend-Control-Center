import { WeloControlCenterPage } from './app.po';

describe('welo-control-center App', function() {
  let page: WeloControlCenterPage;

  beforeEach(() => {
    page = new WeloControlCenterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
