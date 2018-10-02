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
    return this.context.plot;
  }

  render() {
    return false;
  }
}

Layer.contextTypes = {
  plot: PropTypes.instanceOf(Plot)
};

Layer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
  options: PropTypes.object
};
