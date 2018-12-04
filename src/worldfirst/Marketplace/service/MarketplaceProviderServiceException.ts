import DomainException from "../DomainException";

class MarketplaceProviderServiceException extends DomainException {
    static notFoundForName(name: string) {
        return new this(`Marketplace not found for name: '${name}'`);
    }
}

export default MarketplaceProviderServiceException;
