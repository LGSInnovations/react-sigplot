import React, { Component } from 'react';
import { SigPlot, ArrayLayer, PipeLayer, HrefLayer } from '../src';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rasterData: [],
      rasterData2D: [],
      width: 300,
      height: 300,
      href: 'http://sigplot.lgsinnovations.com/dat/penny.prm',
    };
  }

  componentDidMount() {
    setInterval(() => {
      let random = [];
      let random2D = [];
      const { width, height } = this.state;
      for (let i = 0; i < 1000; i += 1) {
        random.push(Math.random());
        let tmp = [];
        for (let j = 0; j < 100; j += 1) {
          tmp.push(Math.random());
        }
        random2D.push(tmp);
      }
      const newWidth = width > 350 ? width : width + 1;
      const newHeight = height < 200 ? height : height - 1;
      this.setState({
        rasterData: random,
        rasterData2D: random2D,
        width: newWidth,
        height: newHeight,
      });
    }, 16);
  }

  render() {
    const { rasterData, rasterData2D, href, width, height } = this.state;
    return (
      <div>
        <SigPlot options={{ autol: 1 }} height={height}>
          <ArrayLayer data={rasterData} />
        </SigPlot>
        <SigPlot>
          <ArrayLayer
            options={{ type: 2000, subsize: 100 }}
            data={rasterData2D}
          />
        </SigPlot>
        <SigPlot>
          <PipeLayer
            options={{ type: 2000, subsize: 1000 }}
            data={rasterData}
          />
        </SigPlot>
        <SigPlot width={width}>
          <HrefLayer href={href} />
        </SigPlot>
      </div>
    );
  }
}
