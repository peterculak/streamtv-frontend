interface PlayableItem {
    title: string;
    subtitle: string;
    image: string;
    mp4: Array<any>;
    length: number;//in seconds
    description?: string;
    meta: {};
}

export default PlayableItem;
