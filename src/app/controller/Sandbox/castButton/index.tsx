import React, {useState} from 'react';

export default class GoogleCastButton extends React.Component<{}> {

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
                'width': '1em',
                'height': '1em',
                'font-size': '1.5rem',
                'display': 'inline-block',
                '--disconnected-color': '#FFF',
                '--connected-color': '#FFAF3B'
            }
        };

        return (
            //@ts-ignore
            <google-cast-launcher {...props} />
        )
    }
}