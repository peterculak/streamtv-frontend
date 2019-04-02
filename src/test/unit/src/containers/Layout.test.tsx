import React from 'react';
import {shallow} from 'enzyme';
import Layout from '../../../../containers/Layout';

describe('Layout container', () => {
    it('renders without crashing', () => {
        shallow(<Layout />);
    });
});
