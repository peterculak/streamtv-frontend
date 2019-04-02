import React from 'react';
import {shallow} from 'enzyme';
import Main from '../../../../containers/Main';
import {createMuiTheme} from '@material-ui/core/styles';
import streamTv from '../../../../containers/themes/streamTv';

describe('Main container', () => {
    const theme = createMuiTheme(streamTv);

    it('renders without crashing', () => {
        shallow(<Main theme={theme} />);
    });
});
