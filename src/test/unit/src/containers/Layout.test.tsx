import React from 'react';
import {shallow} from 'enzyme';
import Layout from '../../../../containers/Layout';
import Container from '../../../../container/index';

jest.mock('../../../../container/index');

describe('Layout container', () => {
    let container: Container;
    beforeEach(() => {
        Container.mockClear();
        container = new Container({});
    });

    it('renders without crashing', () => {
        shallow(<Layout container={container}/>);
    });
});
