import NotFoundExceptionInterface from "../framework/container/NotFoundExceptionInterface";

class NotFoundException extends Error implements NotFoundExceptionInterface {
    public static withId(id: string): NotFoundException {
        return new this('Service ' + id + ' not found in container');
    }
}

export default NotFoundException;
