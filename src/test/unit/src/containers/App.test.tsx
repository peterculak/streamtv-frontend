import React from 'react';
import {shallow} from 'enzyme';
import App from '../../../../containers/App';
import Container from '../../../../container/index';

jest.mock('../../../../container/index');

describe('Application container', () => {
    let container: Container;
    beforeEach(() => {
        Container.mockClear();
        container = new Container({});
    });

    it('renders without crashing', () => {
        shallow(<App container={container}/>);
    });
});