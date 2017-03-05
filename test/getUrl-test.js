// Unit tests for DownloadLink component
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { getUrl } from "../src/js/actions/workbench/getUrl"
import getDownloadUrl from "../src/js/actions/workbench/getDownloadUrl"

describe("getUrl", () => {

  // try with prod env
  const env = process.env.NODE_ENV;

  it("url for local is localhost", () => {
    process.env.NODE_ENV = 'local';
    var url = getUrl();
    expect(url).to.eql('http://localhost:7001/');
  });

  it("url for stage is ai-workbench-staging", () => {
    process.env.NODE_ENV = 'stage';
    var url = getUrl();
    expect(url).to.eql('https://ai-workbench-staging.conversica.com/');
  });

  it("url for qa is ai-workbench-qa", () => {
    process.env.NODE_ENV = 'qa';
    var url = getUrl();
    expect(url).to.eql('https://ai-workbench-qa.conversica.com/');
  });

  it("download url for local is localhost", () => {
    process.env.NODE_ENV = 'local';
    var url = getDownloadUrl('/foo.zip');
    expect(url).to.eql('http://localhost:7001/foo.zip');
  });

  it("download url for prod is passed url", () => {
      process.env.NODE_ENV = 'prod';
      var url = getDownloadUrl('https://example.com/foo.zip');
      expect(url).to.eql('https://example.com/foo.zip');
  });

  process.env.NODE_ENV = env;
});
