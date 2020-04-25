import React from "react";
import { expect } from "chai";
import sinon from "sinon";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import { Plot } from "sigplot";
import { HrefLayer } from "../src/index.js";

configure({ adapter: new Adapter() });

window.alert = (msg) => {
  console.log(msg);
};

describe("<HrefLayer />", () => {
  beforeEach(() => {
    sinon.spy(Plot.prototype, "deoverlay");
    sinon.spy(Plot.prototype, "overlay_href");
    sinon.spy(Plot.prototype, "change_settings");
  });

  afterEach(() => {
    Plot.prototype.deoverlay.restore();
    Plot.prototype.overlay_href.restore();
    Plot.prototype.change_settings.restore();
  });

  it("reloads plot on href prop change", () => {
    const element = global.document.createElement("div");
    const context = { plot: new Plot(element, {}) };
    const hrefOne = "";
    const component = mount(<HrefLayer href={hrefOne} />, { context });

    expect(component.props().href).to.equal(hrefOne);
    expect(component.instance().plot).to.not.be.undefined;
    expect(Plot.prototype.deoverlay).to.have.property("callCount", 0);
    expect(Plot.prototype.overlay_href).to.have.property("callCount", 1);
    expect(Plot.prototype.overlay_href.getCall(0).args).to.have.length(3);
    expect(Plot.prototype.overlay_href.getCall(0).args[0]).to.equal(hrefOne);

    const hrefTwo = "dat/penny.prm";
    component.setProps({ href: hrefTwo });
    expect(component.props().href).to.equal(hrefTwo);
    expect(component.instance().plot).to.not.be.undefined;
    expect(Plot.prototype.deoverlay).to.have.property("callCount", 1);
    expect(Plot.prototype.deoverlay.getCall(0).args).to.not.be.empty;
    expect(Plot.prototype.overlay_href).to.have.property("callCount", 2);
    expect(Plot.prototype.overlay_href.getCall(1).args).to.have.length(3);
    expect(Plot.prototype.overlay_href.getCall(1).args[0]).to.equal(hrefTwo);
  });

  it("doesn't do anything when props change, but stay the same", () => {
    const element = global.document.createElement("div");
    const context = { plot: new Plot(element, {}) };
    const hrefOne = "dat/penny.prm";
    const options = {};
    const component = mount(<HrefLayer href={hrefOne} options={options} />, {
      context,
    });
    expect(Plot.prototype.deoverlay).to.have.property("callCount", 0);
    expect(Plot.prototype.overlay_href).to.have.property("callCount", 1);
    expect(Plot.prototype.change_settings).to.have.property("callCount", 1);

    component.setProps({ href: hrefOne, options: options });
    expect(Plot.prototype.deoverlay).to.have.property("callCount", 0);
    expect(Plot.prototype.overlay_href).to.have.property("callCount", 1);
    expect(Plot.prototype.change_settings).to.have.property("callCount", 1);
  });

  it("changes settings on options prop change", () => {
    const element = global.document.createElement("div");
    const context = { plot: new Plot(element, {}) };
    const hrefOne = "dat/penny.prm";

    sinon.spy(Plot.prototype, "overlay_bluefile");

    const component = mount(<HrefLayer href={hrefOne} />, { context });

    expect(component.props().href).to.equal(hrefOne);
    expect(component.instance().plot).to.not.be.undefined;
    expect(Plot.prototype.overlay_bluefile).to.have.property("callCount", 1);
    expect(component.instance().layer).to.equal(0);
    expect(Plot.prototype.deoverlay).to.have.property("callCount", 0);
    expect(Plot.prototype.overlay_href).to.have.property("callCount", 1);
    expect(Plot.prototype.overlay_href.getCall(0).args).to.have.length(3);
    expect(Plot.prototype.overlay_href.getCall(0).args[0]).to.equal(hrefOne);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].drawmode).to.be.undefined;

    const options = {
      drawmode: "righttoleft",
    };
    component.setProps({ options: options });
    expect(component.props().href).to.equal(hrefOne);
    expect(component.instance().plot).to.not.be.undefined;
    expect(Plot.prototype.deoverlay).to.have.property("callCount", 0);
    expect(Plot.prototype.overlay_href).to.have.property("callCount", 1);
    expect(Plot.prototype.overlay_href.getCall(0).args).to.have.length(3);
    expect(Plot.prototype.overlay_href.getCall(0).args[0]).to.equal(hrefOne);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].drawmode).to.equal(
      options.drawmode
    );
  });
});
