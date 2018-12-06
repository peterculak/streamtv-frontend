import React from 'react';
import {shallow} from 'enzyme';
import Header from '../../../../../containers/Header/index';

describe('Header container', () => {
    it('renders without crashing', () => {
        shallow(<Header/>);
    });
});
