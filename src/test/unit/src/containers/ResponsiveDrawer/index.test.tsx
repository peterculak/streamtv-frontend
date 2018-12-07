import React from 'react';
import {shallow} from 'enzyme';
import ResponsiveDrawer from "../../../../../containers/ResponsiveDrawer";

describe('Responsive Drawer container', () => {
    it('renders without crashing', () => {
        shallow(<ResponsiveDrawer/>);
    });
});
