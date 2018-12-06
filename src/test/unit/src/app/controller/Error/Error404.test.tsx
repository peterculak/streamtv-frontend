import React from 'react';
import {shallow} from 'enzyme';
import Error404 from '../../../../../../app/controller/Error/Error404';

describe('Error404', () => {
    it('renders without crashing', () => {
        shallow(<Error404/>);
    });
});
