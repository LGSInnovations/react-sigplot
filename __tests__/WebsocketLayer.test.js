import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { Plot } from 'sigplot';
import { WebsocketLayer } from '../src/index.js';

configure({ adapter: new Adapter() });

window.alert = (msg) => {
  console.log(msg);
};

describe('<WebsocketLayer />', () => {
  beforeEach(() => {
    sinon.spy(Plot.prototype, 'deoverlay');
    sinon.spy(Plot.prototype, 'overlay_websocket');
    sinon.spy(Plot.prototype, 'change_settings');
  });

  afterEach(() => {
    Plot.prototype.deoverlay.restore();
    Plot.prototype.overlay_websocket.restore();
    Plot.prototype.change_settings.restore();
  });

  it("doesn't reload plot on same wsurl change", () => {
    const options = { framesize: 1000 };
    const element = global.document.createElement('div');
    const context = { plot: new Plot(element, {}) };

    const websocketURL = 'ws://0.0.0.0';
    const component = mount(
      <WebsocketLayer wsurl={websocketURL} options={options} />,
      { context }
    );

    expect(component.props().wsurl).to.equal(websocketURL);
    expect(component.props().options).to.equal(options);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);

    component.setProps({ wsurl: websocketURL });
    expect(component.props().wsurl).to.equal(websocketURL);
  });

  it('reloads plot on wsurl prop change', () => {
    const options = { framesize: 1000 };
    const element = global.document.createElement('div');
    const context = { plot: new Plot(element, {}) };

    const websocketURL = 'ws://0.0.0.0';
    const component = mount(
      <WebsocketLayer wsurl={websocketURL} options={options} />,
      { context }
    );

    expect(component.props().wsurl).to.equal(websocketURL);
    expect(component.props().options).to.equal(options);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);

    component.setProps({ wsurl: websocketURL });
    expect(component.props().wsurl).to.equal(websocketURL);

    const websocketURL2 = 'ws://0.0.0.0/foo';

    component.setProps({ wsurl: websocketURL2 });
    expect(component.props().wsurl).to.equal(websocketURL2);
    expect(component.props().options).to.equal(options);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
  });

  it('throws an error on empty URL', () => {
    const originalError = console.error;
    console.error = jest.fn();
    expect(() => {
      const element = global.document.createElement('div');
      const options = {};
      const context = { plot: new Plot(element, options) };

      const websocketURL = '';
      const component = mount(<WebsocketLayer wsurl={websocketURL} />, {
        context,
      });
    }).to.throw(/The URL '' is invalid./);
    console.error = originalError;
  });

  it('changes settings on options prop change', () => {
    const element = global.document.createElement('div');
    const options = { drawmode: 'scrolling', framesize: 1000 };
    const context = { plot: new Plot(element, {}) };

    const websocketURL = 'ws://0.0.0.0';
    const component = mount(
      <WebsocketLayer wsurl={websocketURL} options={options} />,
      { context }
    );

    const oneDimensionalData = [];
    expect(component.props().wsurl).to.equal(websocketURL);
    expect(component.props().options).to.equal(options);
    expect(component.instance().plot).to.not.be.undefined;
    expect(Plot.prototype.deoverlay).to.have.property('callCount', 0);
    expect(Plot.prototype.overlay_websocket).to.have.property('callCount', 1);
    expect(Plot.prototype.overlay_websocket.getCall(0).args).to.have.length(3);
    expect(Plot.prototype.overlay_websocket.getCall(0).args[0]).to.equal(
      websocketURL
    );
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].drawmode).to.equal(
      options.drawmode
    );

    const newOptions = { drawmode: 'righttoleft' };
    component.setProps({ options: newOptions });
    expect(component.props().wsurl).to.equal(websocketURL);
    expect(component.props().options).to.equal(newOptions);
    expect(component.instance().plot).to.not.be.undefined;
    expect(Plot.prototype.overlay_websocket).to.have.property('callCount', 1);
    expect(Plot.prototype.overlay_websocket.getCall(0).args).to.have.length(3);
    expect(Plot.prototype.overlay_websocket.getCall(0).args[0]).to.equal(
      websocketURL
    );
    expect(component.instance().plot._Gx.lyr[0].drawmode).to.equal(
      newOptions.drawmode
    );
  });
});
