import React from 'react';
import PropTypes from 'prop-types';
import Layer from './layer';

export default class WebsocketLayer extends Layer {
  componentDidMount() {
    const { wsurl, overrides, options } = this.props;
    this.layer = this.plot.overlay_websocket(wsurl, overrides, options);
  }

  componentWillReceiveProps(nextProps) {
    const {
      wsurl: oldWsurl,
      options: oldOptions,
    } = this.props;

    const {
      wsurl: newWsurl,
      overrides: newOverrides,
      options: newOptions,
    } = nextProps;

    // we only care if `wsurl` or `options` changes;
    if (newWsurl !== oldWsurl) {
      this.plot.overlay_websocket(newWsurl, newOverrides, newOptions);
    } else if (newOptions !== oldOptions) {
      this.plot.change_settings(newOptions);
    }
  }
}

WebsocketLayer.propTypes = {
  wsurl: PropTypes.string,
  overrides: PropTypes.func,
  options: PropTypes.object,
};

WebsocketLayer.defaultProps = {
  wsurl: '',
};
