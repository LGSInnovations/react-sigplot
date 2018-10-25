import React from 'react';
import PropTypes from 'prop-types';
import Layer from './layer';

export default class HrefLayer extends Layer {
  componentDidMount() {
    const { href, onload, options } = this.props;
    this.plot.deoverlay();
    this.layer = this.plot.overlay_href(href, onload, options);
  }

  componentWillReceiveProps(nextProps) {
    const {
      href: oldHref,
      options: oldOptions,
    } = this.props;

    const {
      href: newHref,
      onload: newOnload,
      options: newOptions,
    } = nextProps;

    // we only care if `href` or `options` changes;
    if (newHref !== oldHref) {
      this.plot.deoverlay();
      this.plot.overlay_href(newHref, newOnload, newOptions);
    } else if (newOptions !== oldOptions) {
      this.plot.change_settings(newOptions);
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
