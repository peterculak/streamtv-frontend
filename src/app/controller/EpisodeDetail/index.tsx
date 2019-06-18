import * as React from 'react';
import ChannelServiceInterface from "../../../service/ChannelServiceInterface";
import ProgramServiceInterface from "../../../service/ProgramServiceInterface";
import Grid from '@material-ui/core/Grid';
import {withStyles, useTheme, Theme} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Player from "../../../components/player";
import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import RelatedEpisode from "../../../components/episode/related";
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

interface PropsInterface {
    channelService: ChannelServiceInterface,
    programService: ProgramServiceInterface,
    match: any,
    location: any,
    history: any,
    classes: any,
}

const styles = (theme: Theme) => ({
    rhc: {
        padding: '8px',
        [theme.breakpoints.up('sm')]: {
            padding: '16px'
        },
        [theme.breakpoints.up('md')]: {
            padding: '8px 8px 0 16px'
        },
    }
});

class EpisodeDetailController extends React.Component<PropsInterface, any> {
    constructor(props: PropsInterface) {
        super(props);

        this.state = {
            selectedSeasonIndex: 0,
            selectedVideoIndex: 0,
            autoplay: 1,
        };
    }

    componentDidMount() {
        this.setState({
            episode: this.props.location.state.episode,
            nextEpisode: this.props.location.state.archive.seasons[this.props.location.state.selectedSeasonIndex].episodes[1],
            archive: this.props.location.state.archive,
            selectedSeasonIndex: this.props.location.state.selectedSeasonIndex,
        });
    }

    componentWillReceiveProps(nextProps: PropsInterface) {
        this.setState({
            episode: nextProps.location.state.episode,
        });
    }

    render() {
        const {classes, history, match} = this.props;

        const handleChange = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
            this.setState({selectedSeasonIndex: parseInt(event.target.value)});
        };

        const handleAutoplayChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({autoplay: event.target.checked});
        };

        const spacing = 3;

        return (
            <div className="app-wrapper">

                {/*<Grid container*/}
                {/*      direction="row"*/}
                {/*      alignItems="flex-start">*/}
                {/*    <Box mb={1}>top row</Box>*/}
                {/*</Grid>*/}

                <Grid container spacing={0}
                      direction="row"
                      justify="space-between"
                      alignItems="flex-start">

                    <Grid item sm={12} md={8}>
                        <Paper elevation={0} className={classes.paper}>
                            <Player video={this.state.episode}/>
                        </Paper>
                    </Grid>


                    {this.state.archive ? (
                        <Grid item sm={12} md={4}
                              container
                              direction="row"
                        >
                            <Paper elevation={0} className={classes.rhc}>

                                <Grid item xs={12}
                                  container
                                      justify="flex-end"
                                  direction="row"
                            >
                                    {this.state.archive.seasons.length > 0 ? (
                                        <Grid item xs={6}>
                                            <Box mb={1}>
                                                <FormControl>
                                                    <Select
                                                        value={this.state.selectedSeasonIndex}
                                                        onChange={handleChange}
                                                        name='selectedSeasonNumber'
                                                    >
                                                        {this.state.archive.seasons.map((season: any, index: number) =>
                                                            <MenuItem
                                                                key={index + season.seasonNumber}
                                                                value={index}>{season.name}</MenuItem>)}
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    ) : ''}


                                <Grid item xs={6}>
                                    <Box mb={1} textAlign="right">
                                        <FormGroup>
                                            <FormControlLabel
                                                labelPlacement="start"
                                                control={
                                                    <Switch
                                                        checked={this.state.autoplay}
                                                        onChange={handleAutoplayChange()}
                                                        value="checkedB"
                                                        color="primary"
                                                    />
                                                }
                                                label="autoplay"
                                            />
                                        </FormGroup>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}
                                  container
                                  direction="row"
                            >

                                <Grid item xs={12}>
                                    <Box mb={1}/>
                                    <RelatedEpisode
                                        key='nextEpisode' episode={this.state.nextEpisode}
                                        itemClick={() => history.push(`/${match.params.channelId}/${match.params.slug}/episode/${this.state.nextEpisode.episodeNumber}`, {
                                            archive: this.state.archive,
                                            episode: this.state.nextEpisode,
                                            selectedSeasonIndex: this.state.selectedSeasonIndex
                                        } as any)}
                                    ></RelatedEpisode>
                                    <Box mb={2} mt={2}>
                                        <Divider variant="fullWidth"/>
                                    </Box>
                                </Grid>

                                {this.state.archive.seasons[this.state.selectedSeasonIndex].episodes.map(
                                    (episode: any, index: number) =>
                                        <Grid key={index + episode.name} item xs={12}><Box mb={1}><RelatedEpisode
                                            key={index + episode.name} episode={episode}
                                            itemClick={() => history.push(`/${match.params.channelId}/${match.params.slug}/episode/${episode.episodeNumber}`, {
                                                archive: this.state.archive,
                                                episode: episode,
                                                selectedSeasonIndex: this.state.selectedSeasonIndex
                                            } as any)}
                                        /></Box></Grid>
                                )}

                            </Grid>
                            </Paper>
                        </Grid>) : ''}
                </Grid>

            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(EpisodeDetailController);
