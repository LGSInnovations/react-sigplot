import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Plot } from 'sigplot';

/**
 * Abstract base class for all Layers
 */
export default class Layer extends Component {
  static contextTypes = {
    plot: PropTypes.instanceOf(Plot)
  }

  static propTypes = {
    /** Array of `Number` types */
    data: PropTypes.arrayOf(PropTypes.number), // eslint-disable-line react/no-unused-prop-types

    /** Header options for `data` */
    options: PropTypes.object, // eslint-disable-line react/no-unused-prop-types

    /**
     * Options about the layer
     *
     * @see See [sigplot.layer1d](https://github.com/LGSInnovations/sigplot/blob/master/js/sigplot.layer1d.js)
     * @see See [sigplot.layer2d](https://github.com/LGSInnovations/sigplot/blob/master/js/sigplot.layer2d.js)
     */
    layerOptions: PropTypes.object // eslint-disable-line react/no-unused-prop-types
  }

  /**
   * On unmount, all we need to do is remove the layer
   * from the plot.
   */
  componentWillUnmount() {
    this.plot.remove_layer(this.layer);
  }

  /**
   * Getter for the sigplot.Plot object
   *
   * The `plot` is 'given' to  the layer-children
   * from the <SigPlot> parent component, so we receive
   * it from the context.
   */
  get plot() {
    const { plot } = this.context;
    return plot;
  }

  /**
   * The layer components don't _actually_ render to the DOM.
   *
   * They are merely abstractions of canvas-manipulations.
   */
  render() {
    return false;
  }
}
