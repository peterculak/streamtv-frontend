import Provider from "../../../../../../worldfirst/Marketplace/entity/Provider";
import ProviderRepository from "../../../../../../worldfirst/Marketplace/repository/ProviderRepository";
import fetch from 'jest-fetch-mock';
import ProviderRepositoryException
    from "../../../../../../worldfirst/Marketplace/repository/ProviderRepositoryException";

describe('ProviderRepository', () => {
    let repository: ProviderRepository;
    const provider: Provider = Provider.fromObjectLiteral({id: 1, name: 'name'});

    beforeEach(() => {
        repository = new ProviderRepository({
            scheme: 'http',
            host: '0.0.0.0',
            version: 'v1',
        });
        fetch.resetMocks();
    });

    it('findManyByProvider returns promise with array of object literals', () => {
        fetch.mockResponseOnce(JSON.stringify([{id: 1, name: 'Amazon'}]));
        expect.assertions(4);
        return repository.getMarketplaces(provider).then((r: Array<{id: number, name: string}>) => {
            expect(r[0].id).toEqual(1);
            expect(r[0].name).toEqual('Amazon');
            expect(fetch.mock.calls.length).toEqual(1);
            expect(fetch.mock.calls[0][0]).toEqual('http://0.0.0.0/v1/provider/1/marketplaces');
        });
    });

    it('findOneByName returns provider when it finds one', () => {
        const provider = repository.findOneByName('Amazon');
        expect(provider instanceof Provider).toEqual(true);
    });

    it('throws exception when doesn\'t find provider by name', () => {
        expect(() => repository.findOneByName('NonExisting')).toThrow(ProviderRepositoryException);
    });
});
