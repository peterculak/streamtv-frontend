import React from 'react';
import {shallow} from 'enzyme';
import Main from '../../../../containers/Main';
import Container from '../../../../container/index';
import {createMuiTheme} from '@material-ui/core/styles';
import worldFirst from '../../../../containers/themes/worldFirst';

jest.mock('../../../../container/index');

describe('Main container', () => {
    let container: Container;
    const theme = createMuiTheme(worldFirst);
    beforeEach(() => {
        Container.mockClear();
        container = new Container({});
    });

    it('renders without crashing', () => {
        shallow(<Main theme={theme} container={container}/>);
    });
});
