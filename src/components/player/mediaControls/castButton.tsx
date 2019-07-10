import React, {useState} from 'react';
import './index.css';
import Cast from '@material-ui/icons/Cast';
import Button from '@material-ui/core/Button';

export default class GoogleCastButton extends React.Component<any, any> {

    private _ref: React.RefObject<HTMLElement>;

    constructor(props: any) {
        super(props);
        this._ref = React.createRef();
    }

    componentWillUnmount() {
        this._ref.current!.remove();
        // this._ref.current!.dispose() // <-- error throws here
    }

    render() {
        const props = {
            ref: this._ref,
            style: {
                'transition': 'opacity .1s cubic-bezier(0.4,0.0,1,1)',
                'width': '23px',
                'height': '23px',
                'marginLeft': '8px',
                'marginRight': '8px',
                'fontSize': '1.5rem',
                'display': 'inline-block',
                '--disconnected-color': 'rgb(238, 238, 238)',
                '--connected-color': 'rgb(62, 166, 255)',
            }
        };
        //
        // if (this.props.disabled) {
        //     return (
        //         <Button
        //             disabled={true}
        //             size="small"
        //             style={{backgroundColor: 'transparent', verticalAlign: 'initial'}}
        //         >
        //             <Cast />
        //         </Button>
        //     );
        // }

        return (
            //@ts-ignore
            <google-cast-launcher {...props} />
        );
    }
}