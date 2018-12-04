import DomainException from "../Exception/DomainException";

class MarketplaceRepositoryException extends DomainException {
    static notFoundWithName(name: string): MarketplaceRepositoryException {
        return new this(`No provider found for '${name}'`);
    }
}

export default MarketplaceRepositoryException;
