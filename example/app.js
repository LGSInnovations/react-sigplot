import React, {Component} from 'react';
import { SigPlot, ArrayLayer, PipeLayer } from '../src';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rasterData: []
    };
  }

  componentDidMount() {
    setInterval(()=> {
      let random = [];
      for (let i = 0; i <= 1000; i += 1) {
          random.push(Math.random());
      }
      this.setState({rasterData: random});
    }, 16);
  }

  render() {
    return(
      <div>
        <SigPlot options={{autol:1}}>
          <ArrayLayer data={this.state.rasterData}/>
        </SigPlot>
        <SigPlot>
          <PipeLayer options={{type: 2000, subsize: 1000}} 
            data={this.state.rasterData}/>
        </SigPlot>
      </div>
    );
  }
}
