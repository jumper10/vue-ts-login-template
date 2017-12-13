import { spy, assert } from 'sinon';
import { expect } from 'chai';
import Component from 'vue-class-component';
import { ComponentTest, MockLogger } from '../../src/util/component-test';
import { AboutComponent } from '../../src/app/about';

let loggerSpy = spy();

@Component({
  template: require('../../src/app/about/about.html')
})
class MockAboutComponent extends AboutComponent {
  constructor() {
    super();
    this.logger = new MockLogger(loggerSpy);
  }
}

describe('About component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><about></about></div>', { 'about': MockAboutComponent });
  });

  it('should render correct contents', async () => {
    debugger;
    directiveTest.createComponent();

    await directiveTest.execute((vm) => {
      expect(vm.$el.querySelector('.repo-link').getAttribute('href')).to.equal('https://github.com/ducksoupdev/vue-webpack-typescript');
      assert.calledWith(loggerSpy, 'about is ready!');
    });
  });
});
