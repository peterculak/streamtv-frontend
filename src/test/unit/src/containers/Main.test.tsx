import React from 'react';
import {shallow} from 'enzyme';
import Main from '../../../../containers/Main';
import Container from '../../../../container/index';

jest.mock('../../../../container/index');

describe('Main container', () => {
    let container: Container;
    beforeEach(() => {
        Container.mockClear();
        container = new Container({});
    });

    it('renders without crashing', () => {
        shallow(<Main container={container}/>);
    });
});
