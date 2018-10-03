import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Plot } from 'sigplot';

export default class SigPlot extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getChildContext() {
    return {
      plot: this.plot,
    };
  }

  componentDidMount() {
    const { options } = this.props;
    this.plot = new Plot(this.element, options);

    // Have to trigger context tree, setting state does that.
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ plot: this.plot });
  }

  render() {
    const {
      height,
      width,
    } = this.props;
    const plot = this.plot;
    const children = plot ?
      React.Children.map(this.props.children, (child) => {
        if (child) {
          return React.cloneElement(child, { plot });
        }
        return null;
      }) : null;

    return (
      <div
        style={{ height, width, display: 'inline-block' }}
        ref={element => this.element = element}
      >
        { children }
      </div>);
  }
}

SigPlot.childContextTypes = {
  plot: PropTypes.instanceOf(Plot)
};

SigPlot.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
  width: PropTypes.number,
  options: PropTypes.object,
};

SigPlot.defaultProps = {
  height: 300,
  width: 300,
  options: {
    all: true,
    expand: true,
    autol: 100,
    autohide_panbars: true
  },
};
