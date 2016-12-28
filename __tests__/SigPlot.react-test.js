import React from 'react';
import SigPlot from '../SigPlot';
import renderer from 'react-test-renderer';

test('SigPlot renders without data', () => {
    const component = renderer.create(
        <SigPlot data=[] />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
