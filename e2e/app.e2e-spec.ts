import { StudyProject2Page } from './app.po';

describe('study-project2 App', function() {
  let page: StudyProject2Page;

  beforeEach(() => {
    page = new StudyProject2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
