import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Plot } from 'sigplot';

/**
 * SigPlot.js React wrapper class
 *
 * @version 0.1.2
 * @visibleName SigPlot.js React Wrapper
 */
export default class SigPlot extends Component {
  static propTypes = {
    /**
     * Different Layer nodes (e.g., ArrayLayer, PipeLayer, etc.)
     *
     * @ignore
     */
    children: PropTypes.node,

    /** Height of the wrapper div */
    height: PropTypes.number,

    /** Width of the wrapper div */
    width: PropTypes.number,

    /** CSS 'display' property */
    display: PropTypes.string,

    /** Styles object for any other CSS styles on the wrapper div */
    styles: PropTypes.object,

    /**
     * SigPlot plot-level options
     *
     * @see See [sigplot.Plot Docs](http://sigplot.lgsinnovations.com/html/doc/sigplot.Plot.html)
     */
    options: PropTypes.object,
  };

  static childContextTypes = {
    plot: PropTypes.instanceOf(Plot),
  };

  static defaultProps = {
    height: 300,
    width: 300,
    display: 'inline-block',
    options: {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    },
  };

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
    // eslint-disable-next-line react/no-unused-state
    this.setState({ plot: this.plot });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { height, width, options } = this.props;
    const {
      height: newHeight,
      width: newWidth,
      options: newOptions,
    } = nextProps;

    // When the outer div height/width changes,
    // we need to explicitly tell SigPlot to resize;
    // otherwise, it won't resize automatically.
    if (newHeight !== height || newWidth !== width) {
      this.plot.checkresize();
    }

    // If the options change at the plot level,
    // we need to handle that
    if (newOptions !== options) {
      this.plot.change_settings(newOptions);
    }
  }

  render() {
    const {
      height,
      width,
      display,
      styles,
      children: propChildren,
    } = this.props;
    const { plot } = this;

    /**
     * Recall we're treating the `sigplot.layer1d` and
     * `sigplot.layer2d` as (virtual) children nodes since
     * they are simply manipulations/API calls that modify
     * the underlying <canvas>.
     *
     * As such, the user should never have to access the
     * `children` property outright, instead being able to
     * write
     *
     *   <SigPlot>
     *     <ArrayLayer ... />
     *   </SigPlot>
     *
     * Anyway, the point of the following statement is
     * to provide the `plot` object (controlled by the parent)
     * to the child so it can mutate it.
     */
    const children = plot
      ? React.Children.map(propChildren, (child) => {
        if (child) {
          return React.cloneElement(child, { plot });
        }
        return null;
      })
      : null;

    return (
      <div
        style={{
          height,
          width,
          display, // this will be deprecated
          ...styles,
        }}
        ref={element => (this.element = element)}
      >
        {children}
      </div>
    );
  }
}
