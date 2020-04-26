import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Plot } from 'sigplot';
import { PipeLayer } from '../src/index';

configure({ adapter: new Adapter() });

window.alert = (msg) => {
  console.log(msg);
};

describe('<PipeLayer />', () => {
  beforeEach(() => {
    sinon.spy(Plot.prototype, 'push');
    sinon.spy(Plot.prototype, 'headermod');
    sinon.spy(Plot.prototype, 'change_settings');
  });

  afterEach(() => {
    Plot.prototype.push.restore();
    Plot.prototype.headermod.restore();
    Plot.prototype.change_settings.restore();
  });

  it('modifies the header on options prop change', () => {
    const element = global.document.createElement('div');
    const context = { plot: new Plot(element, {}) };

    const options = { framesize: 1000, type: 2000, subsize: 1000 };
    const component = mount(
      <PipeLayer data={[]} options={options} />,
      { context }
    );
    expect(component.props().options).to.equal(options);
    expect(Plot.prototype.push).to.have.property('callCount', 0);
    expect(Plot.prototype.headermod).to.have.property('callCount', 0);
    expect(Plot.prototype.change_settings).to.have.property('callCount', 1);

    const newOptions = {
      framesize: 2000,
    };
    component.setProps({ options: newOptions });
    expect(component.props().options).to.equal(newOptions);
    expect(Plot.prototype.push).to.have.property('callCount', 1);
    expect(Plot.prototype.headermod).to.have.property('callCount', 1);
    expect(Plot.prototype.change_settings).to.have.property('callCount', 2);
  });

  it('modifies settings on layerOptions prop change', () => {
    const element = global.document.createElement('div');
    const context = { plot: new Plot(element, {}) };

    const layerOptions = { drawmode: 'scrolling' };
    const options = { framesize: 1000, type: 2000, subsize: 1000 };
    const component = mount(
      <PipeLayer
        data={[]}
        options={options}
        layerOptions={layerOptions}
      />,
      { context }
    );
    expect(component.props().layerOptions).to.equal(layerOptions);
    expect(Plot.prototype.push).to.have.property('callCount', 0);
    expect(Plot.prototype.headermod).to.have.property('callCount', 0);
    expect(Plot.prototype.change_settings).to.have.property('callCount', 1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].drawmode).to.equal(
      layerOptions.drawmode
    );

    const newLayerOptions = { drawmode: 'righttoleft' };
    component.setProps({ layerOptions: newLayerOptions });
    expect(component.props().layerOptions).to.equal(newLayerOptions);
    expect(Plot.prototype.push).to.have.property('callCount', 0);
    expect(Plot.prototype.headermod).to.have.property('callCount', 0);
    expect(Plot.prototype.change_settings).to.have.property('callCount', 1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].drawmode).to.equal(
      newLayerOptions.drawmode
    );
  });

  it('pushes new data to plot on data prop change', () => {
    const element = global.document.createElement('div');
    const context = { plot: new Plot(element, {}) };

    const twoDimensionalData = [];

    const options = { framesize: 1000, type: 2000, subsize: 1000 };
    const component = mount(
      <PipeLayer data={twoDimensionalData} options={options} />,
      { context }
    );

    expect(component.props().data).to.equal(twoDimensionalData);
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].hcb.subsize).to.equal(1000);
    expect(component.instance().plot._Gx.lyr[0].hcb.type).to.equal(2000);
    const tmp = new Float64Array(1000);
    for (let i = 0; i < 1000; i++) {
      expect(component.instance().plot._Gx.lyr[0].hcb.dview[i]).to.equal(
        tmp[i]
      );
    }

    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
      random.push(i * 10);
    }
    component.setProps({ data: random });
    expect(component.props().data).to.equal(random);
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].hcb.subsize).to.equal(1000);
    expect(component.instance().plot._Gx.lyr[0].hcb.type).to.equal(2000);
    const tmp2 = new Float64Array(random);
    for (let i = 0; i < 1000; i++) {
      expect(component.instance().plot._Gx.lyr[0].hcb.dview[i]).to.equal(
        tmp2[i]
      );
    }
  });

  it("doesn't replot the same data on data prop change", () => {
    const element = global.document.createElement('div');
    const context = { plot: new Plot(element, {}) };

    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
      random.push(i * 10);
    }

    const options = { framesize: 1000, type: 2000, subsize: 1000 };
    const component = mount(<PipeLayer data={random} options={options} />, {
      context,
    });

    expect(component.props().data).to.equal(random);
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].hcb.subsize).to.equal(1000);
    expect(component.instance().plot._Gx.lyr[0].hcb.type).to.equal(2000);
    expect(Plot.prototype.push).to.have.property('callCount', 1);
    for (let i = 0; i < 1000; i++) {
      expect(component.instance().plot._Gx.lyr[0].hcb.dview[i]).to.equal(
        random[i]
      );
    }

    component.setProps({ data: random });
    expect(component.props().data).to.equal(random);
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].hcb.subsize).to.equal(1000);
    expect(component.instance().plot._Gx.lyr[0].hcb.type).to.equal(2000);

    expect(Plot.prototype.push).to.have.property('callCount', 1);
    for (let i = 0; i < 1000; i++) {
      expect(component.instance().plot._Gx.lyr[0].hcb.dview[i]).to.equal(
        random[i]
      );
    }
  });
});
