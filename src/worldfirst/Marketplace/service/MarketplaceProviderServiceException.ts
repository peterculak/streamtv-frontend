import DomainException from "../Exception/DomainException";

class MarketplaceProviderServiceException extends DomainException {
    static notFoundWithName(name: string) {
        return new this(`Marketplace not found for name: '${name}'`);
    }
}

export default MarketplaceProviderServiceException;
