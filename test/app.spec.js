import React                      from 'react';
import expect                     from 'expect';
import sinon                      from 'sinon';
import { shallow, mount }         from 'enzyme';
import { App }                    from '../src/components/App';
import * as actions               from '../actions/actions';
import { applySpotify, profile }  from '../reducers/reducerProfile';

describe('App Component', () => {
  it('dispatches getProfileInfo on componentDidMount', () => {
    const id = 123456;
    const dispatch = sinon.spy();
    const wrapper = shallow(<App params={id} dispatch={dispatch}/>);
    wrapper.instance().componentDidMount();
    expect(dispatch.calledOnce).toEqual(true);
  });

  it('handles Highschool submission', () => {
    const dispatch = sinon.spy();
    const birthday = {
      day: '25',
      month: '10',
      year: '1987'
    };
    const wrapper = shallow(<App dispatch={dispatch} birthday={birthday} />);
    wrapper.instance().handleHighSchool();
    expect(dispatch.calledOnce).toEqual(true);
  });

  it('handles Middleschool submission', () => {
    const dispatch = sinon.spy();
    const birthday = {
      day: '25',
      month: '10',
      year: '1987'
    };
    const wrapper = shallow(<App dispatch={dispatch} birthday={birthday} />);
    wrapper.instance().handleMiddleSchool();
    expect(dispatch.calledOnce).toEqual(true);
  });
});