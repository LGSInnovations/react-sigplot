import React from 'react';
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
    this.layer = this.plot.overlay_pipe(this.props.options);
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.props.data) {
      this.plot.push(this.layer, nextProps.data);
    }
  }
}
