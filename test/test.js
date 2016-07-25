import expect from 'expect';
import { shallow } from 'enzyme';
import App from '../src/components/App.js';

describe('Basic Test', () => {
  it('Loads Something', () => {
    const wrapper = shallow(<App />);
    console.log(wrapper);
  })
})