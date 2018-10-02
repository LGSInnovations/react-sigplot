import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Plot } from 'sigplot';
import Layer from './layer';

export default class PipeLayer extends Layer {
  componentDidMount() {
    this.layer = this.plot.overlay_pipe(this.props.options);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.props.data) {
      this.plot.push(this.layer, nextProps.data);
    }
  }
}
