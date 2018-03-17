import { shallow } from 'enzyme';
import * as React from 'react';
import Layout from './index';
import Header from '../Header';

describe('<Layout />', () => {
   it('render elements inside body', () => {
       const givenChildren = (<div className="foo">Bar</div>);
       const wrapper = shallow(<Layout>{givenChildren}</Layout>);
       expect(wrapper.contains(givenChildren)).toBe(true);
   });

   it('render the header', () => {
        const wrapper = shallow(<Layout/>);
        expect(wrapper.find(Header)).toHaveLength(1);
    });
});