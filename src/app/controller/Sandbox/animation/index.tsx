import React, {useState} from 'react';
import {Transition} from 'react-transition-group';

const duration = 1000;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
};

const transitionStyles: {
    [key: string]: any
} = {
    entering: {opacity: 1},
    entered: {opacity: 0},
    exiting: {opacity: 1},
    exited: {opacity: 0},
};

function Index(props: any) {
    const [inProp, setInProp] = useState(false);
    const [run, setRun] = useState(false);

    const toggleInOut = () => {
        if (inProp) {
            setInProp(false);
        } else {
            setInProp(true);
        }
    };

    return (
        <div>
            {run ? (
                <Transition in={inProp} timeout={duration}>
                    {state => {
                        if (inProp) {
                            return (<div style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}>
                                Transition in
                            </div>);
                        }

                        return (
                            <div style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}>
                                Transition out
                            </div>
                        );
                    }}
                </Transition>
            ) : (<div>transition is disabled</div>)}

            <button onClick={() => toggleInOut()}>
                In
            </button>
            <button onClick={() => toggleInOut()}>
                Out
            </button>

            <button onClick={() => setRun(true)}>
                Enable
            </button>
            <button onClick={() => setRun(false)}>
                Disable
            </button>
            {run ? 'Enabled': 'Disabled'}
        </div>
    );
};

export default Index;