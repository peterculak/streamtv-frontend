import React from 'react'
import requestAnimationFrame from 'raf';

export const memoryStore = {
    _data: new Map(),
    get(key: any) {
        if (!key) {
            return null
        }

        return this._data.get(key) || null
    },
    set(key: any, data: any) {
        if (!key) {
            return
        }
        return this._data.set(key, data)
    }
};

type ScrollPosition = {x: number, y: number};

/**
 * Component that will save and restore Window scroll position.
 */
export default class ScrollPositionManager extends React.Component<any, any> {
    private readonly _target: any;

    static defaultProps = {
        scrollStore: memoryStore
    };

    constructor(props: any) {
        super(props);
        this._target = window
    }

    restoreScrollPosition(pos?: any): void {
        pos = pos || this.props.scrollStore.get(this.props.scrollKey);
        if (this._target && pos) {
            requestAnimationFrame(() => {
                this.scroll(this._target, pos)
            })
        }
    }

    saveScrollPosition(key?: any): void {
        if (this._target) {
            const pos = this.getScrollPosition(this._target);
            key = key || this.props.scrollKey;
            this.props.scrollStore.set(key, pos);
        }
    }

    componentDidMount(): void {
        this.restoreScrollPosition();
    }

    componentWillReceiveProps(nextProps: any): void {
        if (this.props.scrollKey !== nextProps.scrollKey) {
            this.saveScrollPosition();
        }
    }

    componentDidUpdate(prevProps: any): void {
        if (this.props.scrollKey !== prevProps.scrollKey) {
            this.restoreScrollPosition()
        }
    }

    componentWillUnmount(): void {
        this.saveScrollPosition()
    }

    render() {
        const {children = null} = this.props;
        return (children);
    }

    private scroll(target: Element, pos: ScrollPosition): void {
        target.scrollTo(pos.x, pos.y);
    }

    private getScrollPosition(target: { scrollX: number, scrollY: number }): ScrollPosition {
        return {x: target.scrollX, y: target.scrollY}
    }
}