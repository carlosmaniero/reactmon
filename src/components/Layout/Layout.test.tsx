import { shallow } from 'enzyme';
import * as React from 'react';
import Header from '../Header';
import Layout from './index';

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