import React from 'react'; // eslint-disable-line no-unused-vars
import Layer from './layer';

/**
 * Wrapper around sigplot.Plot.overlay_pipe
 *
 * This wrapper is for streaming 1-D plots or
 * 2-D raster waterfall plots.
 *
 * Typical use of this would look like
 *
 *   <SigPlot>
 *     <PipeLayer options={options} data={data}/>
 *   </SigPlot>
 *
 * where options is populated before data begins flowing
 */
export default class PipeLayer extends Layer {
  /**
   * On mount, the only action we can take is to overlay the
   * pipe with the specified header (`options`) information
   *
   * It isn't until data begins coming that we can begin to
   */
  componentDidMount() {
    const { options, data, layerOptions } = this.props;

    // start by setting the header of the pipe
    this.layer = this.plot.overlay_pipe(options, layerOptions);

    // if data is provided and non-empty, go ahead and
    // begin plotting data
    if (data !== undefined && data.length > 0) {
      this.plot.push(this.layer, data);
    }
  }

  /**
   * Handles new properties being passed into <PipeLayer/>
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
   *
   * @TODO Handle headermod updates
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      data: currentData,
      options: currentOptions,
      layerOptions: currentLayerOptions,
    } = this.props;
    const {
      data: nextData,
      options: nextOptions,
      layerOptions: nextLayerOptions,
    } = nextProps;

    // if new data has come in, plot that
    if (nextData && nextData !== currentData) {
      this.plot.push(this.layer, nextData, nextOptions);
    } else if (nextOptions !== currentOptions) {
      this.plot.headermod(this.layer, nextOptions);
    } else if (nextLayerOptions !== currentLayerOptions) {
      this.plot.get_layer(this.layer).change_settings(nextLayerOptions);
    }

    return false;
  }
}
