import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Plot } from 'sigplot';

/**
 * Abstract base class for all Layers
 */
export default class Layer extends Component {
  componentWillUnmount() {
    this.plot.remove_layer(this.layer);
  }

  get plot() {
    const { plot } = this.context;
    return plot;
  }

  render() {
    return false;
  }
}

Layer.contextTypes = {
  plot: PropTypes.instanceOf(Plot)
};

Layer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number), // eslint-disable-line react/no-unused-prop-types
  options: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  layerOptions: PropTypes.object // eslint-disable-line react/no-unused-prop-types
};
