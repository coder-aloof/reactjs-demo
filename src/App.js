import React, {Component} from 'react';
import Button from "./components/Button";
import "./css/style.css"
import {Parser} from "expr-eval";

const operators = ['/', '-', '+', '*'];
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: '0',
            current: '0',
            expression: '',
            nextIsReset: false
        }
    }

    reset = (symbol) => {
        this.setState({total: '0', current: '0', expression: '', nextIsReset: false});
    };

    addToCurrent = (symbol) => {
        let {expression} = this.state;
        if (operators.indexOf(symbol) > -1) {
            if (expression.length > 0) {
                if (operators.indexOf(expression[expression.length - 1]) === -1) {
                    expression = expression.concat(symbol);
                    this.setState({expression, nextIsReset: true});
                }
            }
        } else {
            expression = expression.concat(symbol);
            this.setState({expression});
            if ((this.state.current === '0' && this.state.symbol !== '.') || this.state.nextIsReset) {
                this.setState({current: symbol, nextIsReset: false});
            } else {
                this.setState({current: this.state.current + symbol});
            }
        }
    };

    calculate = (symbol) => {
        let {total, expression} = this.state;
        if (expression.length > 0) {
            if (operators.indexOf(expression[expression.length - 1]) === -1) {
                total = String(new Parser().evaluate(expression));
                this.setState({total, current: total, expression: total, nextIsReset: true});
            }
        }
    };

    render() {
        const buttons = [
            {symbol: 'C', cols: 3, action: this.reset},
            {symbol: '/', cols: 1, action: this.addToCurrent},
            {symbol: '7', cols: 1, action: this.addToCurrent},
            {symbol: '8', cols: 1, action: this.addToCurrent},
            {symbol: '9', cols: 1, action: this.addToCurrent},
            {symbol: '*', cols: 1, action: this.addToCurrent},
            {symbol: '4', cols: 1, action: this.addToCurrent},
            {symbol: '5', cols: 1, action: this.addToCurrent},
            {symbol: '6', cols: 1, action: this.addToCurrent},
            {symbol: '-', cols: 1, action: this.addToCurrent},
            {symbol: '1', cols: 1, action: this.addToCurrent},
            {symbol: '2', cols: 1, action: this.addToCurrent},
            {symbol: '3', cols: 1, action: this.addToCurrent},
            {symbol: '+', cols: 1, action: this.addToCurrent},
            {symbol: '0', cols: 2, action: this.addToCurrent},
            {symbol: '.', cols: 1, action: this.addToCurrent},
            {symbol: '=', cols: 1, action: this.calculate}
        ];
        return (
            <div className="App">
                {this.state.expression.length > 0 ?
                    <div className="floaty-last">{this.state.expression}</div>
                    : null
                }
                <input className="result" type="text" value={this.state.current} />
                <br/>
                {buttons.map(
                    (btn, i) => {
                        return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)}/>
                    }
                )}
            </div>
        );
    }
}

export default App;
