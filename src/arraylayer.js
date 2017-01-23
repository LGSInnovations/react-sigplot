import React, { Component, PropTypes } from 'react';
import { Plot } from 'sigplot';
import Layer from './layer';

export default class ArrayLayer extends Layer {
  componentDidMount() {
    this.layer = this.plot.overlay_array(this.props.data, this.props.options);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.plot.reload(this.layer, nextProps.data);
    }
  }
}
