import DomainException from "../Exception/DomainException";

class ProviderRepositoryException extends DomainException {
    static notFoundWithName(name: string): ProviderRepositoryException {
        return new this(`Provider not found for name: '${name}'`);
    }
}

export default ProviderRepositoryException;
