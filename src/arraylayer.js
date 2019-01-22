import React from 'react';
import Layer from './layer';

export default class ArrayLayer extends Layer {
  /**
   * Handles ArrayLayer being mounted onto the DOM
   *
   * All we need to do when the component 'mounts',
   * is call `plot.overlay_array` with the relevant
   * data and options. This will return our layer object.
   *
   * A large portion of the time, especially for dynamic
   * systems, this will look like
   * `this.plot.overlay_array([], undefined)` upon mount.
   */
  componentDidMount() {
    const { data, options, layerOptions } = this.props;
    this.layer = this.plot.overlay_array(data, options, layerOptions);
  }

  /**
   * Handles new properties being passed into <ArrayLayer/>
   *
   * This will be replaced by
   *
   *     static getDerivedStateFromProps(nextProps, prevState)
   *
   * in React 17.
   *
   * This sits in the lifecycle right before `shouldComponentUpdate`,
   * `componentWillUpdate`, and most importantly `render`, so this is
   * where we will call the plot's `reload` and `headermod` methods.
   *
   * @param nextProps    the newly received properties
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.plot.reload(this.layer, nextProps.data, nextProps.options);
    } else if (nextProps.options !== this.props.options) {
      this.plot.headermod(this.layer, nextProps.options);
    }
  }
}
