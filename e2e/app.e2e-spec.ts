import { AceComponentPage } from './app.po';

describe('ace-component App', () => {
  let page: AceComponentPage;

  beforeEach(() => {
    page = new AceComponentPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
