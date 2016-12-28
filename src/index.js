import React, { Component, PropTypes } from 'react';
import { Plot } from 'sigplot';

export default class SigPlot extends Component {
  componentDidMount() {
    const {
      data,
      file,
      raster,
      settings,
      xdelta,
      xunits,
      yunits,
      type,
      websocket,
    } = this.props;
    const subsize = data.length;
    this.plot = new Plot(this.element, settings);
    if (file) {
      this.plot.overlay_href(file);
    } else if (websocket) {
      this.plot.overlay_websocket(websocket);
    } else if (data) {
      if (raster) {
        this.pipeLayer = this.plot.overlay_pipe({
          type,
          xdelta,
          xunits,
          subsize,
        });
        this.plot.push(this.pipeLayer, data);
      } else {
        this.plotLayer = this.plot.overlay_array(data, {
          xunits,
          yunits
        });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      data,
      file,
      raster,
      websocket,
    } = nextProps;
    if (file) {
      this.plot.overlay_href(file);
    } else if (websocket) {
      this.plot.overlay_websocket(websocket);
    } else if (data) {
      if (raster) {
        this.plot.push(this.pipeLayer, data);
      } else {
        this.plot.reload(this.plotLayer, data);
      }
    }
    return false;
  }

  render() {
    const {
      height,
      width,
    } = this.props;
    return (<
      div style={{ height, width, display: 'inline-block' }}
      ref={element => this.element = element}
    />);
  }
}

SigPlot.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  file: PropTypes.string,
  websocket: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.number),
  raster: PropTypes.bool,
  settings: PropTypes.object,
  type: PropTypes.number,
  xunits: PropTypes.number,
  yunits: PropTypes.number,
  xdelta: PropTypes.number
};

SigPlot.defaultProps = {
  height: 300,
  width: 300,
  type: 2000,
  xdelta: 1,
  xunits: 3, // Hz
  yunits: 26, // 10*log
  settings: {
    all: true,
    expand: true,
    autol: 100,
    autohide_panbars: true
  }
};
