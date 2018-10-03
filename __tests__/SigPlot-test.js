import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { SigPlot, ArrayLayer, PipeLayer } from '../src/index.js';

configure({ adapter: new Adapter() })

describe('<SigPlot />', () => {
  it('renders with no child layer', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    const component = mount(<SigPlot />);
    expect(component.props().width).to.equal(300);
    expect(component.props().height).to.equal(300);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.be.undefined;
  });

  it('renders with no child layer with custom height and width', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    const component = mount(<SigPlot height={500} width={800} />);
    expect(component.props().width).to.equal(800);
    expect(component.props().height).to.equal(500);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.be.undefined;
  });

  it('renders with no child layer with custom options and custom height and width', () => {
    const options = {
      all: false,
      expand: false,
      autol: 1,
      autohide_panbars: false,
    };
    const component = mount(<SigPlot height={500} width={800} options={options} />);
    expect(component.props().width).to.equal(800);
    expect(component.props().height).to.equal(500);
    expect(component.props().options.all).to.equal(false);
    expect(component.props().options.expand).to.equal(false);
    expect(component.props().options.autol).to.equal(1);
    expect(component.props().options.autohide_panbars).to.equal(false);
    expect(component.props().children).to.be.undefined;
  });

  it('SigPlot renders with 1D ArrayLayer with no data', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    const oneDimensionalData = [];
    const component = mount(
      <SigPlot options={{autol: 1}}>
        <ArrayLayer data={oneDimensionalData} />
      </SigPlot>
    );
    expect(component.props().width).to.equal(300);
    expect(component.props().height).to.equal(300);
    expect(component.props().children).to.have.lengthOf(1);
    expect(component.props().children[0].props().data).to.equal(oneDimensionalData);
  });

  it('SigPlot renders with 1D ArrayLayer with data', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
        random.push(Math.random());
    }
    const oneDimensionalData = random;
    const component = mount(
      <SigPlot options={{autol: 1}}>
        <ArrayLayer data={oneDimensionalData} />
      </SigPlot>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('SigPlot renders with 2D ArrayLayer with no data', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
        random.push(Math.random());
    }
    const oneDimensionalData = random;
    const component = mount(
        <SigPlot options={{autol: 1}}>
          <ArrayLayer data={oneDimensionalData} />
        </SigPlot>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('SigPlot renders with 2D ArrayLayer with data', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
        random.push(Math.random());
    }
    const oneDimensionalData = random;
    const component = mount(
        <SigPlot options={{autol: 1}}>
          <ArrayLayer data={oneDimensionalData} />
        </SigPlot>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('SigPlot renders with 1D PipeLayer with no data', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
        random.push(Math.random());
    }
    const oneDimensionalData = random;
    const component = mount(
        <SigPlot options={{autol: 1}}>
          <ArrayLayer data={oneDimensionalData} />
        </SigPlot>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('SigPlot renders with 1D PipeLayer with data', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
        random.push(Math.random());
    }
    const oneDimensionalData = random;
    const component = mount(
        <SigPlot options={{autol: 1}}>
          <ArrayLayer data={oneDimensionalData} />
        </SigPlot>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('SigPlot renders with 2D PipeLayer with no data', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
        random.push(Math.random());
    }
    const oneDimensionalData = random;
    const component = mount(
        <SigPlot options={{autol: 1}}>
          <ArrayLayer data={oneDimensionalData} />
        </SigPlot>
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it('SigPlot renders with 2D PipeLayer with data', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
        random.push(Math.random());
    }
    const oneDimensionalData = random;
    const component = mount(
        <SigPlot options={{autol: 1}}>
          <ArrayLayer data={oneDimensionalData} />
        </SigPlot>
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
