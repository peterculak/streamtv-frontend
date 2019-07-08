import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import Slider from '@material-ui/core/Slider';

const progressBarStyles = makeStyles({
    root: {
        color: 'rgb(255,0,0)',
        height: 5,
        padding: '16px 0 0 0',
        display: 'block',
        position: 'absolute',
        bottom: '33px',
    },
    thumb: (props: any) => ({
        transition: 'opacity .25s cubic-bezier(0.0,0.0,0.2,1)',
        opacity: props.hover ? 1 : 0,
    }) ,
    active: {},
    track:(props: any) => ({
        transition: 'scaleY .25s cubic-bezier(0.0,0.0,0.2,1)',
        height: 3,
        // transform: props.hover ? 'scaleY(2)' : 'scaleY(1)',
    }),
    rail:(props: any) => ({
        color: 'rgba(255,255,255,.2)',
        transition: 'scaleY .25s cubic-bezier(0.0,0.0,0.2,1)',
        opacity: 1,
        height: 3,
        // transform: props.hover ? 'scaleY(2)' : 'scaleY(1)',
    }),
});

function StyledSlider(props: any) {
    const {hover, ...rest} = props;
    const classes = progressBarStyles(props);

    return <Slider classes={classes} {...rest} />
}

function VideoProgressBar(props: any, ref: any) {
    const {player} = useSelector((state: any) => ({
        player: state.player,
    }));

    const [isVideoProgressMouseOver, setIsVideoProgressMouseOver] = React.useState<boolean>(false);
    const videoProgresChange = (event: any, newValue: any) => {
        player.setProgress(newValue);
    };

    const progressBarMouseOut = () => {
        setIsVideoProgressMouseOver(false);
    };

    const progressBarMouseOver = () => {
        setIsVideoProgressMouseOver(true);
    };

    if (player && player.isLoaded()) {
        return (
            <StyledSlider
                hover={isVideoProgressMouseOver}
                onMouseOver={() => progressBarMouseOver()}
                onMouseOut={() => progressBarMouseOut()}
                component="div"
                value={(player.getCurrentTime() / player.current().duration) * 100}
                onChange={videoProgresChange}
                aria-labelledby="continuous-slider"
            />
        );
    }

    return (<div></div>);
}

export default VideoProgressBar;
