import React, { Component } from 'react';
import { DraggableCore } from 'react-draggable';

export default class VerticalSlider extends Component {
    constructor(props){
        super(props);

        this.state = {
            top: props.itemHeight * -1 * props.index
        };

        this.handleDrag = this.handleDrag.bind(this);
    }

    componentDidUpdate(prevProps){
        const currentIdx = Math.floor(Math.abs(this.state.top) / this.props.itemHeight);
        if (prevProps.index !== this.props.index && this.props.index !== currentIdx) {
            this.setState({
                top: this.props.itemHeight * -1 * this.props.index
            });
        }
    }

    _getMaxHeight(){
        return (this.props.totalLength - 1) * this.props.itemHeight * -1;
    }

    handleDrag(e, ui) {
        const minTop = this._getMaxHeight();
        let newY = this.state.top + ui.deltaY;
        if (newY > 0) {
            newY = 0;
        } else if (newY < minTop) {
            newY = minTop;
        }

        if (newY !== this.state.top) {
            const oldIdx = Math.floor(Math.abs(this.state.top) / this.props.itemHeight);
            const newIdx = Math.floor(Math.abs(newY) / this.props.itemHeight);

            this.setState({
                top: newY
            }, () => {
                if (oldIdx !== newIdx) {
                    this.props.onIndexChange && this.props.onIndexChange(newIdx);
                }
            });
        }
    }

    render(){
        const currentIdx = Math.floor(Math.abs(this.state.top) / this.props.itemHeight);
        const indicesToRender = [];
        if (currentIdx - 1 > 0) {
            indicesToRender.push(currentIdx - 1);
        }

        indicesToRender.push(currentIdx);

        if (currentIdx + 1 < this.props.totalLength) {
            indicesToRender.push(currentIdx + 1);
        }

        const adjustedTop = this.state.top % (this.props.itemHeight * 5);

        return (
            <div style={{height: `${this.props.itemHeight}px`, overflow: 'hidden', position: 'relative'}}>
                <DraggableCore
                    onDrag={this.handleDrag}
                >
                    <div style={{position: 'absolute', transform: `translate(0px, ${adjustedTop}px)`}}>
                        {
                            indicesToRender.map((index) => {
                                const top = ((currentIdx % 5) + (index - currentIdx)) * this.props.itemHeight;
                                const style = {top: `${top}px`, left: 0, right: 0, height: this.props.itemHeight, position: 'absolute'};
                                return this.props.renderOption({index, style})
                            })
                        }
                    </div>
                </DraggableCore>
            </div>
        )
    }
}
