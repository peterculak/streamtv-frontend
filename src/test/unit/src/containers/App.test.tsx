import React from 'react';
import {shallow} from 'enzyme';
import App from '../../../../containers/App';

describe('Application container', () => {
    it('renders without crashing', () => {
        shallow(<App />);
    });
});
