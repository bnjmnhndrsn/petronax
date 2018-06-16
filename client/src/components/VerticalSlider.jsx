import React, { Component } from 'react';
import { DraggableCore } from 'react-draggable';

export default class VerticalSlider extends Component {
    constructor(){
        super();

        this.state = {
            top: 0
        };

        this.handleDrag = this.handleDrag.bind(this);
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

        this.setState({
            top: newY
        });
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


        return (
            <div style={{height: `${this.props.itemHeight}px`, overflow: 'hidden', position: 'relative'}}>
                <DraggableCore
                    onDrag={this.handleDrag}
                >
                    <div style={{position: 'absolute', transform: `translate(0px, ${this.state.top}px)`}}>
                        {
                            indicesToRender.map(index => {
                                const top = index * this.props.itemHeight;
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
