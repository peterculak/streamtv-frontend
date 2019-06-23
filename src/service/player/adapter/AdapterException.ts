class AdapterException extends Error {
    static noVideoElement(): AdapterException {
        return new this('No video element set');
    };

    static emptyVideoSource(): AdapterException {
        return new this('No video source set');
    }
}

export default AdapterException;
