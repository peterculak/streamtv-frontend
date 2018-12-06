import React from 'react';
import ReactDOM from 'react-dom';
import MarketplaceController from '../../../../../../app/controller/Marketplace/index';
import Container from '../../../../../../container/index';
import {createMuiTheme} from '@material-ui/core/styles';
import worldFirst from '../../../../../../containers/themes/worldFirst';
import MarketplaceService from '../../../../../../worldfirst/Marketplace/service/MarketplaceService';

jest.mock("../../../../../../worldfirst/Marketplace/service/MarketplaceService", () => {
    return jest.fn().mockImplementation(() => {
        return {
            getMarketplacesByProvider() {
                return new Promise(function (resolve, reject) {
                    resolve([{id: 1}]);
                });
            }
        };
    });
});
import MarketplaceRepository from '../../../../../../worldfirst/Marketplace/repository/MarketplaceRepository';

jest.mock("../../../../../../worldfirst/Marketplace/repository/MarketplaceRepository", () => {
    return jest.fn().mockImplementation(() => {
        return {
            findManyByProvider() {
                return 'mocked';
            }
        };
    });
});

it('MarketplaceController', () => {
    const config = {
        marketplace: {
            api: {
                scheme: 'http',
                host: '0.0.0.0',
                version: 'v1',
            },
        },
    };
    const container = new Container(config);
    const match = {'params': {'providerName': 'Amazon'}};
    const marketplaceServiceMock = new MarketplaceService(
        new MarketplaceRepository(config.marketplace.api)
    );
    const theme = createMuiTheme(worldFirst);
    ReactDOM.render(
        <MarketplaceController
            providerName='amazon'
            match={match}
            marketplaceService={marketplaceServiceMock}
            providerService={container.get('marketplace.provider.service')}
            theme={theme}
        />,
        document.createElement('div')
    );
});
