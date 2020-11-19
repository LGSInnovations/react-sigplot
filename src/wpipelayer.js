import React from 'react'; // eslint-disable-line no-unused-vars
import Layer from './layer';

export default class WPipeLayer extends Layer {
  /**
   * Handles WPipeLayer being mounted onto the DOM
   *
   * All we need to do when the component 'mounts',
   * is call `plot.overlay_wpipe` with the relevant
   * websocket url and options. This will return our layer object.
   *
   * A large portion of the time, especially for dynamic
   * systems, this will look like a single
   * `this.plot.overlay_wpipe(wsurl, null, {"layerType": "1D", pipesize: ...)`
   * upon mount.
   */
  componentDidMount() {
    const { wsurl, options, layerOptions } = this.props;
    this.layer = this.plot.overlay_wpipe(wsurl, options, layerOptions);
  }

  /**
   * Handles new properties being passed into <WPipeLayer/>
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
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      wsurl: currentWsurl,
      options: currentOptions,
      layerOptions: currentLayerOptions,
    } = this.props;
    const {
      wsurl: nextWsurl,
      options: nextOptions,
      layerOptions: nextLayerOptions,
    } = nextProps;

    // if the wsurl changes, we'll go ahead
    // and delete the layer and create a new one
    // otherwise, we only need to headermod
    // with the new options
    if (nextWsurl !== currentWsurl) {
      this.plot.delete_layer(this.layer);
      this.layer = this.plot.overlay_wpipe(nextWsurl, options, layerOptions);
    } else if (nextOptions !== currentOptions) {
      this.plot.headermod(this.layer, nextOptions);
    } else if (nextLayerOptions !== currentLayerOptions) {
      this.plot.get_layer(this.layer).change_settings(nextLayerOptions);
    }
    return false;
  }
}
