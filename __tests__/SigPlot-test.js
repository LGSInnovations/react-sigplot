import React from 'react';
import SigPlot from '../src/index.js';
import renderer from 'react-test-renderer';

test('SigPlot renders without data', () => {
    const component = renderer.create(
        <SigPlot data={[]} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('SigPlot renders data from array', () => {
    const component = renderer.create(
        <SigPlot data={[1, 2, 3, 4]} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
