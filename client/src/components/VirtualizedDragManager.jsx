import React, { Component } from 'react';
import { DraggableCore } from 'react-draggable';
import { times, debounce } from 'lodash';

import { getMaxElementSize } from '../utils';

export const SCROLL_DIRECTION_VERTICAL = 'vertical';
export const SCROLL_DIRECTION_HORIZONTAL = 'horizontal';

const BUFFER_SIZE = 1;

export default class VerticalSlider extends Component {
    constructor(props){
        super(props);

        this.state = {
            offset: this._getInitialOffset()
        };

        this.handleDrag = this.handleDrag.bind(this);
        this.broadcastUpdate = debounce(this.broadcastUpdate, 300);
    }

    static getDerivedStateFromProps(props, state){
        let shouldUpdate = false;
        if (!state.offset) {
            shouldUpdate = true;
        } else {
            const { totalItems, itemSize, containerSize } = props;
            const { offset } = state;

            const totalSize = totalItems * itemSize;
            const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
            const offsetPercentage = totalSize <= containerSize ? 0 : offset / (safeTotalSize - containerSize);
            const currentIndex = Math.floor(totalItems * offsetPercentage * -1);

            if (currentIndex !== props.currentIndex) {
                shouldUpdate = true;
            }
        }

        if (shouldUpdate) {
            const { totalItems, itemSize, containerSize, currentIndex } = props;
            const unscaledOffset = itemSize * currentIndex;
            const totalSize = totalItems * itemSize;
            const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
            const offsetPercentage = totalSize <= containerSize ? 0 : unscaledOffset / (totalSize - containerSize);
            const offset = -1 * Math.round(offsetPercentage * (safeTotalSize - containerSize));
            return { offset: offset };
        }

        return null;
    }

    _getInitialOffset(){
        const { totalItems, itemSize, containerSize, currentIndex } = this.props;
        const unscaledOffset = itemSize * currentIndex;
        const totalSize = totalItems * itemSize;
        const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
        const offsetPercentage = totalSize <= containerSize ? 0 : unscaledOffset / (totalSize - containerSize);
        return Math.round(offsetPercentage * safeTotalSize);
    }

    broadcastUpdate(){
        const { totalItems, itemSize, containerSize } = this.props;
        const { offset } = this.state;

        const totalSize = totalItems * itemSize;
        const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
        const offsetPercentage = totalSize <= containerSize ? 0 : offset / (safeTotalSize - containerSize);
        const newIndex = Math.floor(totalItems * offsetPercentage * -1);
        if (newIndex !== this.props.currentIndex) {
            this.props.onIndexChange(newIndex)
        }
    }

    _getMaxHeight(){
        return (this.props.totalItems - 1) * this.props.itemHeight * -1;
    }

    handleDrag(e, ui) {
        const { totalItems, itemSize, containerSize} = this.props;
        const totalSize = totalItems * itemSize;
        const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
        const minTop = (safeTotalSize * -1) + containerSize;
        let newY = this.state.offset + ui.deltaY;
        if (newY > 0) {
            newY = 0;
        } else if (newY < minTop) {
            newY = minTop;
        }

        if (newY !== this.state.offset) {
            this.setState({offset: newY}, () => this.broadcastUpdate());
        }
    }

    render(){
        const { totalItems, itemSize, containerSize, renderItem, scrollDirection } = this.props;
        const { offset } = this.state;

        const totalSize = totalItems * itemSize;
        const safeTotalSize = Math.min(getMaxElementSize(), totalSize);
        const offsetPercentage = totalSize <= containerSize ? 0 : offset / (safeTotalSize - containerSize);
        const currentIndex = Math.floor(totalItems * offsetPercentage * -1);
        const leftBuffer = Math.min(BUFFER_SIZE, currentIndex);
        const visibleItems = Math.ceil(containerSize / itemSize);

        const indices = [];
        times(leftBuffer, (i) => {
            indices.push(currentIndex - (leftBuffer - i));
        });

        times(visibleItems + BUFFER_SIZE, (i) => {
            const index = currentIndex + i;
            if (index < this.props.totalItems) {
                indices.push(index);
            }
        });

        const adjustedOffset = Math.round(offsetPercentage * (safeTotalSize - containerSize));
        const offsetAdjustment = Math.round(offsetPercentage * (safeTotalSize - totalSize));
        let containerDimension, dragTransform;
        if (scrollDirection === SCROLL_DIRECTION_VERTICAL) {
             containerDimension = 'height';
             dragTransform = 'translateY';
        } else {
            containerDimension = 'height';
            dragTransform = 'translateX';
        }


        return (
            <div style={{[containerDimension]: `${containerSize}px`, overflow: 'hidden', position: 'relative'}}>
                <DraggableCore
                    onDrag={this.handleDrag}
                >
                    <div style={{position: 'absolute', [containerDimension]: `${safeTotalSize}px`, transform: `${dragTransform}(${adjustedOffset}px)`}}>
                        {
                            indices.map((index) => {
                                const itemOffset = (index * itemSize) + offsetAdjustment;
                                const style = {
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    [containerDimension]: this.props.itemSize,
                                    transform: `${dragTransform}(${itemOffset}px)`,
                                    position: 'absolute'
                                };
                                return renderItem({index, style})
                            })
                        }
                    </div>
                </DraggableCore>
            </div>
        );
    }
}
