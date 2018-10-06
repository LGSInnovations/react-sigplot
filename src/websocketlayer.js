import React from 'react';
import PropTypes from 'prop-types';
import Layer from './layer';

export default class WebsocketLayer extends Layer {
  componentDidMount() {
    const { wsurl, overrides, options } = this.props;
    this.layer = this.plot.overlay_websocket(wsurl, overrides, options);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.plot.reload(this.layer, nextProps.data);
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
