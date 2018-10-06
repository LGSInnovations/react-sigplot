import React from 'react';
import PropTypes from 'prop-types';
import Layer from './layer';

export default class HrefLayer extends Layer {
  componentDidMount() {
    const { href, onload, options } = this.props;
    this.layer = this.plot.overlay_href(href, onload, options);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.plot.reload(this.layer, nextProps.data);
    }
  }
}

HrefLayer.propTypes = {
  href: PropTypes.string,
  onload: PropTypes.func,
  options: PropTypes.object,
};

HrefLayer.defaultProps = {
  href: '',
  onload: null,
};
