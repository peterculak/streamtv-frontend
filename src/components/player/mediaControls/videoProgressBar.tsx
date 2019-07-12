import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import Slider from '../../slider/Slider';
import {formatLength} from "../../../helpers/functions";

const progressBarStyles = makeStyles({
    root: {
        color: 'rgb(255,0,0)',
        height: '5px',
        padding: '28px 0 0 0',
        display: 'block',
        position: 'absolute',
        bottom: '33px',
    },
    thumb: (props: any) => ({
        transition: 'transform .1s cubic-bezier(0.4,0.0,1,1)',
        marginTop: props.hover ? '-3.5px' : '-4.5px',
        transform: props.hover ? 'none' : 'scale(0)',
        '&$focusVisible,&:hover': {
            boxShadow: 'none',
        },
        '&$active': {
            boxShadow: 'none',
        }
    }),
    active: (props: any) => ({
        boxShadow: 'none',
    }),
    focusVisible: (props: any) => ({
        boxShadow: 'none',
    }),
    track:(props: any) => ({
        height: '5px',
        transform: props.hover ? '' : 'scaleY(0.6)',
        transition: 'transform .1s cubic-bezier(0.4,0.0,1,1)',
        //this could have width transition but only when state is playing so it's smoother
    }),
    rail:(props: any) => ({
        color: 'rgba(255,255,255,.2)',
        transition: 'transform .1s cubic-bezier(0.4,0.0,1,1)',
        opacity: 1,
        height: '5px',
        transform: props.hover ? '' : 'scaleY(0.6)',
    }),
    railHover:(props: any) => ({
        backgroundColor: props.hover ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
        height: '5px',
        transform: props.hover ? '' : 'scaleY(0.6)',
        transition: 'opacity .25s cubic-bezier(0.0,0.0,0.2,1)',
    }),
    railHoverTooltip: {
        left: '0px',
        transformOrigin: '0',
        bottom: '20px',
        color: 'white',
        borderRadius: '2px',
        letterSpacing: '.5px',
        fontSize: '12px',
        fontWeight: 'bold',
        lineHeight: '12px',
    },
    railHoverTooltipInner: {
        padding: '5px 9px',
        backgroundColor: 'rgba(28,28,28,0.9)',
        borderRadius: '2px',
        fontSize: '118%',
        fontWeight: 'bold',
        lineHeight: '15px',
    }
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

    const format = (value: number, index : number): string => {
        return formatLength(player.current().duration * value / 100, index);
    };

    if (player && player.isLoaded()) {
        return (
            <StyledSlider
                railHoverLabel={true}
                railHoverLabelFormat={(value: any, index: number) => format(value, index)}
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
