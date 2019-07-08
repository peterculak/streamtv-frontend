import React from 'react';
import {withStyles, useTheme, Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import Slider from '@material-ui/core/Slider';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeOff from '@material-ui/icons/VolumeOff';
import Button from '@material-ui/core/Button';
import * as ACTIONS from "../../../actions/player";

const progressBarStyles = makeStyles({
    root: {
        color: 'rgb(255,255,255)',
    },
});

function StyledSlider(props: any) {
    const {hover, ...rest} = props;
    const classes = progressBarStyles(props);

    return <Slider classes={classes} {...rest} />
}

const styles = (theme: Theme) => createStyles({
        volumeControlBar: {},
        volumeSlider: {
            root: {
                color: 'white',
            },
            transition: 'opacity .1s cubic-bezier(0.4,0.0,1,1),margin .2s cubic-bezier(0.4,0.0,1,1),width .2s cubic-bezier(0.4,0.0,1,1)',
            width: '0px',
            opacity: 0,
        },
        volumeSliderVisible: {
            transition: 'opacity .1s cubic-bezier(0.4,0.0,1,1),margin .2s cubic-bezier(0.4,0.0,1,1),width .2s cubic-bezier(0.4,0.0,1,1)',
            opacity: 1,
            width: '52px',
            marginLeft: '4px',
            marginRight: '8px',
        },
        buttons: {
            transition: 'opacity .1s cubic-bezier(0.4,0.0,1,1)',
            opacity: 0.9,
            minWidth: '20px',
            verticalAlign: 'initial',
            color: 'rgb(238, 238, 238)',
            '&:hover': {
                opacity: 1,
                color: "#fff",
            },
        },
    }
);

function VolumeControls(props: any, ref: any) {
    const dispatch = useDispatch();

    const {player} = useSelector((state: any) => ({
        player: state.player,
    }));

    const volumeChange = (event: any, newValue: any) => {
        player.setVolume(newValue / 100);
    };
    const [isVolumeMouseOver, setIsVolumeMouseOver] = React.useState<boolean>(false);
    const [isVolumeMouseDown, setIsVolumeMouseDown] = React.useState<boolean>(false);
    const volumeMouseOver = (event: MouseEvent, value: boolean) => {
        setIsVolumeMouseOver(value);
    };
    const volumeMouseDown = (event: MouseEvent, value: boolean) => {
        setIsVolumeMouseDown(value);
    };
    const hideVolumeSlider = () => {
        setIsVolumeMouseOver(false);
        setIsVolumeMouseDown(false);
    };
    const toggleMute = () => {
        if (player.isMuted()) {
            player.unMute();
        } else {
            player.mute();
        }
        dispatch(ACTIONS.videoElementTimeUpdate());//dummy action to trigger render
    };
    const shouldShowVolumeSlider = () => isVolumeMouseOver || isVolumeMouseDown;

    const {classes} = props;


    return (
        <ClickAwayListener onClickAway={hideVolumeSlider}>
            <span
                onMouseOver={(event: any) => volumeMouseOver(event, true)}
                onMouseOut={(event: any) => volumeMouseOver(event, false)}
                className={classes.volumeControlBar}>
                <Button
                    size="small"
                    className={classes.buttons}
                    style={{backgroundColor: 'transparent'}}
                    onClick={toggleMute}
                >
                    {player.isMuted() ? (
                        <VolumeOff/>
                    ) : (player.getVolume() > 0.5 ? (<VolumeUp
                        className={classes.buttons}/>) : (<VolumeDown
                        className={classes.buttons}/>))}

                </Button>
                <StyledSlider
                    onMouseDown={(event: any) => volumeMouseDown(event, true)}
                    onMouseUp={(event: any) => volumeMouseDown(event, false)}
                    className={shouldShowVolumeSlider() ? classes.volumeSliderVisible : classes.volumeSlider}
                    value={player.getVolume() * 100}
                    onChange={volumeChange} aria-labelledby="continuous-slider"
                />
            </span>
        </ClickAwayListener>
    );
}

export default withStyles(styles)(VolumeControls);