import DomainException from "../Exception/DomainException";

class ProviderServiceException extends DomainException {
    static notFoundWithName(name: string) {
        return new this(`Provider not found for name: '${name}'`);
    }
}

export default ProviderServiceException;
