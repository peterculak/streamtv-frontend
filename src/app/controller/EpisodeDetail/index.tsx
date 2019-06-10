import * as React from 'react';
import ChannelServiceInterface from "../../../service/ChannelServiceInterface";
import ProgramServiceInterface from "../../../service/ProgramServiceInterface";
import Grid from '@material-ui/core/Grid';
import {withStyles, Theme} from '@material-ui/core/styles';
import Episode from "../../../components/episode";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Player from "../../../components/player";

interface PropsInterface {
    channelService: ChannelServiceInterface,
    programService: ProgramServiceInterface,
    match: any,
    location: any,
    history: any,
    classes: any,
}

const styles = (theme: Theme) => ({
    mainFeaturedPost: {
        position: 'relative' as any,
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute' as any,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative' as any,
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
});

class EpisodeDetailController extends React.Component<PropsInterface, any> {
    constructor(props: PropsInterface) {
        super(props);

        this.state = {
            selectedSeasonIndex: 0
        };
    }

    componentDidMount() {
        this.setState({
            episode: this.props.location.state.episode,
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
        const { classes, history, match } = this.props;

        const handleChange = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
            this.setState({selectedSeasonIndex: parseInt(event.target.value)});
        };

        return (
            <div className="app-wrapper">

                <Grid container spacing={2}
                           direction="row"
                           justify="space-between"
                           alignItems="flex-start">

                        <Grid item sm={12} md={8}>
                            <Player video={this.state.episode}/>
                        </Grid>

                    {this.state && this.state.archive ? (
                        <Grid container direction="row" spacing={2} sm={12} md={3} justify="flex-end"
                              alignItems="flex-start">

                            {this.state.archive.seasons.length > 1 ? (<Grid item >
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="selectedSeasonNumber">Seasons</InputLabel>
                                    <Select
                                        value={this.state.selectedSeasonIndex}
                                        onChange={handleChange}
                                        name='selectedSeasonNumber'
                                    >
                                        {this.state.archive.seasons.map((season: any, index: number) => <MenuItem key={index+season.seasonNumber} value={index}>{season.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>) : ('')}

                            {this.state.archive.seasons[this.state.selectedSeasonIndex].episodes.map(
                                (episode: any, index: number) =>
                                    <Grid key={index+episode.name} item sm={12}><Episode
                                        key={index+episode.name} episode={episode}
                                        itemClick={() => history.push(`/${match.params.channelId}/${match.params.slug}/episode/${episode.episodeNumber}`, {
                                            archive: this.state.archive,
                                            episode: episode,
                                            selectedSeasonIndex: this.state.selectedSeasonIndex
                                        } as any)}
                                    /></Grid>
                            )}
                        </Grid>
                    ) : ('')}

                    </Grid>

            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(EpisodeDetailController);
