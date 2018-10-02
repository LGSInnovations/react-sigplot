import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { SigPlot } from '../src/index.js';

configure({ adapter: new Adapter() })

describe('<SigPlot />', () => {
  it('renders with empty data prop', () => {
    const component = mount(<SigPlot data={[]} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('SigPlot renders data from array', () => {
    const component = mount(
        <SigPlot data={[1, 2, 3, 4]} />
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
