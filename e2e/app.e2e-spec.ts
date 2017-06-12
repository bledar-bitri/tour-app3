import { TourApp3Page } from './app.po';

describe('tour-app3 App', () => {
  let page: TourApp3Page;

  beforeEach(() => {
    page = new TourApp3Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
