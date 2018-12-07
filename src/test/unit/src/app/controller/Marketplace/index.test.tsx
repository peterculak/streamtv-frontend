import React from 'react';
import ReactDOM from 'react-dom';
import MarketplaceController from '../../../../../../app/controller/Marketplace/index';
import ProviderService from '../../../../../../worldfirst/Marketplace/service/ProviderService';
import ProviderRepository from '../../../../../../worldfirst/Marketplace/repository/ProviderRepository';
import mockProvider from "../../../../../../worldfirst/Marketplace/entity/Provider";

jest.mock("../../../../../../worldfirst/Marketplace/service/ProviderService", () => {
    return jest.fn().mockImplementation(() => {
        return {
            getMarketplacesByProvider() {
                return new Promise(function (resolve, reject) {
                    resolve([{id: 1}]);
                });
            },
            getProviderByName(): mockProvider {
                return mockProvider.fromObjectLiteral({id: 1, name: 'Amazon'});
            }
        };
    });
});

jest.mock("../../../../../../worldfirst/Marketplace/repository/ProviderRepository", () => {
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
    const match = {'params': {'providerName': 'Amazon'}};
    const providerServiceMock = new ProviderService(
        new ProviderRepository(config.marketplace.api)
    );
    ReactDOM.render(
        <MarketplaceController
            providerName='amazon'
            providerService={providerServiceMock}
            match={match}
        />,
        document.createElement('div')
    );
});
