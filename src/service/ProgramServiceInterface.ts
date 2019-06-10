interface ProgramServiceInterface {
    findAll(channelId: string): Promise<Array<any>>;
    findOne(channel: string, slug: string): Promise<Array<any>>;
}

export default ProgramServiceInterface;
