import React, { Component } from 'react';
import { DraggableCore } from 'react-draggable';

const ITEM_HEIGHT = 30;

const OPTIONS = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

export default class VerticalSlider extends Component {
    constructor(){
        super();

        this.state = {
            top: 0
        };

        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDrag(e, ui) {
        const minTop = (OPTIONS.length - 1) * ITEM_HEIGHT * -1;
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
        return (
            <div style={{height: `${ITEM_HEIGHT}px`, overflow: 'hidden', position: 'relative'}}>
                <DraggableCore
                    onDrag={this.handleDrag}
                >
                    <div style={{position: 'absolute', transform: `translate(0px, ${this.state.top}px)`}}>
                        {
                            OPTIONS.map(option => <div style={{height: `${ITEM_HEIGHT}px`}} key={option}>{option}</div>)
                        }
                    </div>
                </DraggableCore>
            </div>
        )
    }
}
