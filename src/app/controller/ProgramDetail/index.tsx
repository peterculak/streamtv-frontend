import * as React from 'react';
import Paper from '@material-ui/core/Paper/index';
import ChannelServiceInterface from "../../../service/ChannelServiceInterface";
import ProgramServiceInterface from "../../../service/ProgramServiceInterface";
import {ChannelInterface} from "../../../entities/ChannelInterface";
import Grid from '@material-ui/core/Grid';
import {withStyles, Theme} from '@material-ui/core/styles';
import Episode from "../../../components/episode";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

interface PropsInterface {
    channelService: ChannelServiceInterface,
    programService: ProgramServiceInterface,
    match: any,
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

class ProgramDetailController extends React.Component<PropsInterface, any> {
    constructor(props: PropsInterface) {
        super(props);
        this.state = {
            selectedSeasonNumber: 0
        };
    }

    componentDidMount() {
        const {match: {params}} = this.props;

        this.props.channelService.find(params.channelId).then((channel: ChannelInterface) => {
            this.setState({
                channel: channel,
            });
        });

        this.props.programService.findOne(params.channelId, params.slug).then((programArchive: any) => {
            this.setState({
                archive: programArchive,
                selectedSeasonIndex: programArchive.seasons.length - 1
            });
        });
    }

    render() {
        const { classes } = this.props;

        const handleChange = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
            this.setState({selectedSeasonIndex: parseInt(event.target.value)});
        };

        return (
            <div className="app-wrapper">

                {this.state && this.state.archive ?
                    (<div>
                        <Paper className={classes.mainFeaturedPost} style={{ minHeight: '360px', backgroundImage: `url(${this.state.archive.thumbnailUrl.replace('100x75n', '1920x')})`}}>
                            {/* Increase the priority of the hero background image */}
                            {
                                <img
                                    style={{ display: 'none' }}
                                    src={this.state.archive.thumbnailUrl.replace('100x75n', '1920x')}
                                    alt="background"
                                />
                            }
                            <div className={classes.overlay} />
                            <Grid container>
                                <Grid item sm={12}>
                                    <div className={classes.mainFeaturedPostContent}>
                                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                            {this.state.archive.name}
                                        </Typography>
                                        <Typography variant="h5" color="inherit" paragraph dangerouslySetInnerHTML={{__html: this.state.archive.description}}>
                                        </Typography>
                                        {/*<Link variant="subtitle1" href="#">*/}
                                        {/*    Continue reading…*/}
                                        {/*</Link>*/}
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>

                        {this.state.archive.seasons.length > 1 ? (<div><Grid container>
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
                        </Grid><br/></div>) : ('')}

                        <Grid container spacing={3}>
                            {this.state.archive.seasons[this.state.selectedSeasonIndex].episodes.map(
                                (episode: any, index: number) => <Grid key={index+episode.name} item xs={12} sm={6} md={4} lg={3}>
                                    <Paper ><Episode
                                        key={index+episode.name} episode={episode}/></Paper>
                                </Grid>)}
                        </Grid>
                    </div>)
                    :
                    (
                        <div className="d-flex justify-content-center">
                        </div>
                    )

                }
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ProgramDetailController);
