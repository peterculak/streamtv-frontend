class AdapterException extends Error {
    static noVideoElement(): AdapterException {
        return new this('No video element set');
    };

    static emptyVideoSource(): AdapterException {
        return new this('No video source set');
    }

    static volumeOutOfRange(volume: number, min: number, max: number): AdapterException {
        return new this(`Volume ${volume} is out of range <${min}-${max}>`);
    }
}

export default AdapterException;
