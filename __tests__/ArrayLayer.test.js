import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { Plot } from 'sigplot';
import { ArrayLayer } from '../src/index.js';

configure({ adapter: new Adapter() })

window.alert = (msg) => { console.log(msg) };

describe('<ArrayLayer />', () => {
  beforeEach(() => {
    sinon.spy(Plot.prototype, 'overlay_array');
    sinon.spy(Plot.prototype, 'reload');
    sinon.spy(Plot.prototype, 'headermod');
  });

  afterEach(() => {
    Plot.prototype.overlay_array.restore();
    Plot.prototype.reload.restore();
    Plot.prototype.headermod.restore();
  });

  it('reloads plot on data prop change', () => {
    const options = {};
    const element = global.document.createElement("div");
    const context = { plot: new Plot(element, options) };

    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
        random.push(i * 10);
    }
    const oneDimensionalData = random;

    const component = mount(
      <ArrayLayer data={oneDimensionalData} />,
      { context }
    );

    expect(component.props().data).to.equal(oneDimensionalData);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.have.lengthOf(oneDimensionalData.length);
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.eql(new Float64Array(oneDimensionalData));

    let random2 = [];
    for (let i = 0; i <= 1000; i += 1) {
        random2.push(i * 10);
    }
    const oneDimensionalData2 = random2;

    component.setProps({data: random2});
    expect(component.props().data).to.equal(oneDimensionalData2);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.have.lengthOf(oneDimensionalData2.length);
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.eql(new Float64Array(oneDimensionalData2));
  });

  it('doesn\'t do anything when props change but remain the same', () => {
    const options = {framesize: 1000};
    const element = global.document.createElement("div");
    const context = { plot: new Plot(element, options) };

    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
        random.push(i * 10);
    }
    const oneDimensionalData = random;

    const component = mount(
      <ArrayLayer data={oneDimensionalData} layerOptions={options} />,
      { context }
    );

    expect(component.props().data).to.equal(oneDimensionalData);
    expect(component.props().layerOptions).to.equal(options);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].size).to.equal(1000);

    component.setProps({layerOptions: options});
    expect(component.props().layerOptions).to.equal(options);
    expect(component.instance().plot._Gx.lyr[0].size).to.equal(1000);
  });

  it('changes layer settings on layerOptions prop change', () => {
    const options = {framesize: 1000};
    const element = global.document.createElement("div");
    const context = { plot: new Plot(element, options) };

    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
        random.push(i * 10);
    }
    const oneDimensionalData = random;

    const component = mount(
      <ArrayLayer data={oneDimensionalData} layerOptions={options} />,
      { context }
    );

    expect(component.props().data).to.equal(oneDimensionalData);
    expect(component.props().layerOptions).to.equal(options);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].size).to.equal(1000);

    const newOptions = {framesize: 50};

    component.setProps({layerOptions: newOptions});
    expect(component.props().layerOptions).to.equal(newOptions);
    expect(component.instance().plot._Gx.lyr[0].size).to.equal(50);
  });

  it('headermods plot on options prop change', () => {
    const options = {};
    const element = global.document.createElement("div");
    const context = { plot: new Plot(element, options) };

    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
        random.push(i * 10);
    }
    const oneDimensionalData = random;

    const component = mount(
      <ArrayLayer data={oneDimensionalData} options={options} />,
      { context }
    );

    expect(component.props().data).to.equal(oneDimensionalData);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.have.lengthOf(oneDimensionalData.length);
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.eql(new Float64Array(oneDimensionalData));
    expect(Plot.prototype.overlay_array).to.have.property('callCount', 1);
    expect(Plot.prototype.reload).to.have.property('callCount', 0);
    expect(Plot.prototype.headermod).to.have.property('callCount', 0);

    const newOptions = {'subsize': 100};

    component.setProps({options: newOptions});
    expect(component.props().options.subsize).to.equal(100);
    expect(component.instance().plot._Gx.lyr[0].hcb.subsize).to.equal(100);
    expect(Plot.prototype.overlay_array).to.have.property('callCount', 1);
    expect(Plot.prototype.reload).to.have.property('callCount', 0);
    expect(Plot.prototype.headermod).to.have.property('callCount', 1);
  });

});
