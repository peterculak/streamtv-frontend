interface ProgramServiceInterface {
    findAll(channelId: string): Promise<Array<any>>;
}

export default ProgramServiceInterface;
