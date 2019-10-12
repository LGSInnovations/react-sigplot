import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { Plot } from 'sigplot';

/**
 * Abstract base class for all Plugins
 */
export default class Plugin extends Component {
  static propTypes = {
    /**
     * Options about the plugin
     *
     * @see See [plugins](https://github.com/LGSInnovations/sigplot/blob/master/js/plugins.js)
     */
    pluginOptions: PropTypes.object // eslint-disable-line react/no-unused-prop-types
  }

  static contextTypes = {
    plot: PropTypes.instanceOf(Plot)
  }

  /**
   * On unmount, all we need to do is remove the plugin
   * from the plot.
   */
  componentWillUnmount() {
    this.plot.remove_plugin(this.plugin);
  }

  /**
   * Getter for the sigplot.Plot object
   *
   * The `plot` is 'given' to  the plugin-children
   * from the <SigPlot> parent component, so we receive
   * it from the context.
   */
  get plot() {
    const { plot } = this.context;
    return plot;
  }

  /**
   * The plugin components don't _actually_ render to the DOM.
   *
   * They are merely abstractions of canvas-manipulations.
   */
  render() {
    return false;
  }
}
