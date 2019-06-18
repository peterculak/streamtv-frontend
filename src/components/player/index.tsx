import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import {withStyles, Theme} from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
    boxPadding: {
        padding: '8px',
    },
});

class Player extends React.PureComponent<any, any> {
    private playerRef: any;

    constructor(props: any) {
        super(props);
        this.playerRef = React.createRef();
    }

    componentDidMount() {
        if (this.props.video) {
            const index = this.state && this.state.selectedVideoIndex ? this.state.selectedVideoIndex : this.props.video.mp4.length - 1;
            this.playerRef.current.src = this.props.video.mp4[index];
            this.playerRef.current.poster = this.props.video.thumbnailUrl.replace('100x75n', '800x');
            this.playerRef.current.play();
        }
    }

    componentWillReceiveProps(nextProps: any) {
        let index: number;
        if (this.state) {
            index = this.state.selectedVideoIndex;
        } else {
            index = nextProps.video.mp4.length - 1;//default to last mp4 which is highest quality
        }

        if (this.playerRef.current.src !== nextProps.video.mp4[index]) {
            this.playerRef.current.src = nextProps.video.mp4[index];
            this.playerRef.current.poster = nextProps.video.thumbnailUrl.replace('100x75n', '800x');
            this.playerRef.current.play();
        }
    }

    render() {
        const changeVideoIndex = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
            const index = parseInt(event.target.value);
            this.playerRef.current.src = this.props.video.mp4[index];
            this.playerRef.current.poster = this.props.video.thumbnailUrl.replace('100x75n', '800x');
            this.playerRef.current.play();

            this.setState({selectedVideoIndex: index});
        };

        const qualityLabel = (url: string) => {
            const r = url.match(/-([^-]+[p]?)\.mp4/);
            return r && r[1] !== null ? r[1] : 'undefined';
        };
        const { classes } = this.props;

        return (<Box>
            <video ref={this.playerRef} width="100%" height="100%" controls/>
            <Box className={classes.boxPadding}>
                <Grid container spacing={2}
                      direction="row"
                      justify="space-between"
                      alignItems="flex-start">

                    <Grid item>
                        <Typography color="textPrimary"><Box fontSize={18} fontWeight={400}>{this.props.video ? this.props.video.name : ''}</Box></Typography>
                        <Typography variant={'caption'} component="p">
                            Episode: {this.props.video ? this.props.video.episodeNumber : ''}</Typography>
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <Select
                                value={this.state ? this.state.selectedVideoIndex : this.props.video ? this.props.video.mp4.length -1 : 0}
                                onChange={changeVideoIndex}
                                name='selectedVideoIndex'
                            >
                                {this.props.video ? this.props.video.mp4.map((url: any, index: number) => <MenuItem
                                    key={index + url} value={index}>{qualityLabel(url)}</MenuItem>) : ''}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Box mt={1}>
                    <Divider variant="fullWidth" />
                </Box>
            </Box>
        </Box>);
    }
}

export default withStyles(styles, {withTheme: true})(Player);
