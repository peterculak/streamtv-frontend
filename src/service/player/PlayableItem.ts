interface PlayableItem {
    title: string;
    subtitle: string;
    image: string;
    mp4: Array<any>;
    duration: number;//in seconds
    description?: string;
    meta: {};
}

export default PlayableItem;
