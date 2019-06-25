import React from 'react';

class ErrorBoundary extends React.Component<any, { hasError: null} > {
    constructor(props: any) {
        super(props);
        this.state = { hasError: null};
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: any) {
        // log error
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;