import * as React from 'react';

class Player extends React.PureComponent<any, any> {
    private playerRef: any;

    constructor(props: any) {
        super(props);
        this.playerRef = React.createRef();
    }

    componentDidMount() {
        if (this.props.video) {
            this.playerRef.current.src = this.props.video.mp4[0];
            this.playerRef.current.poster = this.props.video.thumbnailUrl.replace('100x75n', '800x');
            this.playerRef.current.play();
        }
    }

    componentWillReceiveProps(nextProps: any) {
        if (this.playerRef.current.src !== nextProps.video.mp4[0]) {
            this.playerRef.current.src = nextProps.video.mp4[0];
            this.playerRef.current.poster = nextProps.video.thumbnailUrl.replace('100x75n', '800x');
            this.playerRef.current.play();
        }
    }

    render() {
        return (<video ref={this.playerRef} width="100%" height="100%" controls />);
    }
}

export default Player;
