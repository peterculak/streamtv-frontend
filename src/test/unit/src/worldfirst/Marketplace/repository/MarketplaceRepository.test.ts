import Provider from "../../../../../../worldfirst/Marketplace/entity/Provider";
import MarketplaceRepository from "../../../../../../worldfirst/Marketplace/repository/MarketplaceRepository";
import fetch from 'jest-fetch-mock';

describe('MarketplaceRepository', () => {
    let repository: MarketplaceRepository;
    const provider: Provider = Provider.fromObjectLiteral({id: 1, name: 'name'});

    beforeEach(() => {
        repository = new MarketplaceRepository({
            scheme: 'http',
            host: '0.0.0.0',
            version: 'v1',
        });
        fetch.resetMocks();
    });

    it('findManyByProvider returns promise with array of object literals', () => {
        fetch.mockResponseOnce(JSON.stringify([{id: 1, name: 'Amazon'}]));
        expect.assertions(4);
        return repository.findManyByProvider(provider).then((r: Array<{id: number, name: string}>) => {
            expect(r[0].id).toEqual(1);
            expect(r[0].name).toEqual('Amazon');
            expect(fetch.mock.calls.length).toEqual(1);
            expect(fetch.mock.calls[0][0]).toEqual('http://0.0.0.0/v1/provider/1/marketplaces');
        });
    });
});
