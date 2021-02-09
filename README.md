react-sigplot
===============
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Build Status](https://travis-ci.org/LGSInnovations/react-sigplot.svg?branch=master)](https://travis-ci.org/LGSInnovations/react-sigplot) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](.github/CONTRIBUTING.md#pull-requests) [![npm version](https://badge.fury.io/js/react-sigplot.svg)](https://badge.fury.io/js/react-sigplot) [![codecov](https://codecov.io/gh/LGSInnovations/react-sigplot/branch/master/graph/badge.svg)](https://codecov.io/gh/LGSInnovations/react-sigplot)

SigPlot wrapper component for ReactJS.

Source: https://lgsinnovations.gitlab.com/axios/react-sigplot

Install: `npm install --save react-sigplot`

## What is it?

Provides a component that wraps the SigPlot library.

## Properties

### \<SigPlot />

|Property|Type|Default|Explanation|
|---|---|---|---|
|`height`|`number`|300|Height of the `div` wrapping SigPlot|
|`width`|`number`|300|Width of the `div` wrapping SigPlot|
|`display`|`string`|inline-block|CSS display type for `div` wrapping SigPlot|
|`styles`|`object`|`undefined`|any other CSS Styles as JS object|
|`options`|`object`|`{all: true, expand: true, autol: 100, autohide_panbars: true}`|SigPlot `Plot` options|

### \<ArrayLayer />

|Property|Type|Default|Explanation|
|---|---|---|---|
|`data`|`array(number)`|`undefined`|Array of values to plot|
|`options`|`object`|`undefined`|SigPlot data header|
|`layerOptions`|`object`|`undefined`|SigPlot `Layer` options|

### \<PipeLayer />

|Property|Type|Default|Explanation|
|---|---|---|---|
|`data`|`array(number)`|`undefined`|Array of values to plot|
|`options`|`object`|`undefined`|SigPlot `Layer` options|

### \<HrefLayer />

|Property|Type|Default|Explanation|
|---|---|---|---|
|`href`|`string`|`''`|URL or path to a bluefile or MATLAB file|
|`onload`|`function`|`null`|Function that will get executed when file is loaded|
|`options`|`object`|`undefined`|SigPlot `Layer` options|

### \<WebsocketLayer />
|Property|Type|Default|Explanation|
|---|---|---|---|
|`wsurl`|`string`|`''`|URL to the websocket server|
|`overrides`|`object`|`undefined`|SigPlot `Layer` overrides|
|`options`|`object`|`undefined`|SigPlot `Layer` options|

## Usage

### Basic

```js
/** Default plot an array three different ways
 * 1. As a standard array
 * 2. As a pipe
 * 3. As a file/url
 */
<div>
  <SigPlot options={{autol:1}}>
    <ArrayLayer data={this.state.rasterData}/>
  </SigPlot>
  <SigPlot>
    <PipeLayer options={{type: 2000, subsize: 1000}}
      data={this.state.rasterData}/>
  </SigPlot>
  <SigPlot>
    <HrefLayer
      href={this.state.href}/>
  </SigPlot>
</div>
```

## Example Preview

If you run

```
$ npm run build
$ python -m SimpleHTTPServer 8888
```

and in a browser, navigate to http://0.0.0.0:8888, you
should see the following

![React Sigplot](https://github.com/spectriclabs/react-sigplot/blob/master/docs/example.gif)
