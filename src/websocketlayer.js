import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import Layer from './layer';

/**
 * Wrapper around sigplot.Plot.overlay_websocket
 *
 * Typical use of this layer looks like
 *   <SigPlot>
 *     <WebsocketLayer wsurl={'ws://localhost:8080'}/>
 *   </SigPlot>
 */
class WebsocketLayer extends Layer {
  static propTypes = {
    /**
     * URI to websocket server
     *
     * This usually looks like ws://<some URI>:<some port>
     *
     * Keep in mind that if the websocket server is on a different domain,
     * most browsers/web-servers will block cross origin requests.
     *
     * Since this layer doesn't take any numeric data,
     * we are omitting the use of the `data` prop here.
     */
    wsurl: PropTypes.string,

    /** Key-value pairs whose values alter plot settings */
    overrides: PropTypes.object,

    /** Layer options */
    options: PropTypes.object,
  };

  static defaultProps = {
    wsurl: '',
  };

  /**
   * On mount, all we need to do is call overlay_websocket
   */
  componentDidMount() {
    const { wsurl, overrides, options } = this.props;
    this.layer = this.plot.overlay_websocket(wsurl, overrides, options);
  }

  /**
   * Handles new properties being passed into <HrefLayer/>
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
   * @TODO Investigate whether deoverlay is necessary here
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { wsurl: oldWsurl, options: oldOptions } = this.props;

    const {
      wsurl: newWsurl,
      overrides: newOverrides,
      options: newOptions,
    } = nextProps;

    // we only care if `wsurl` or `options` changes;
    if (newWsurl !== oldWsurl) {
      this.plot.deoverlay(this.layer);
      this.layer = this.plot.overlay_websocket(
        newWsurl,
        newOverrides,
        newOptions
      );
    } else if (this.layer !== undefined && newOptions !== oldOptions) {
      this.plot.get_layer(this.layer).change_settings(newOptions);
    }

    return false;
  }
}

export default WebsocketLayer;
