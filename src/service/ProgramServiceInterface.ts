interface ProgramServiceInterface {
    findAll(channelId: string): Promise<Array<any>>;
    findOne(slug: string): Promise<Array<any>>;
}

export default ProgramServiceInterface;
