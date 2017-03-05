// Unit tests for DownloadLink component
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { DownloadLink } from "../src/js/views/ResponseSets/GetSet"

describe("<DownloadLink />", () => {

  it("renders a download link component", () => {
    const rset = {download_link: false} ;
    const wrapper = shallow(<DownloadLink rset={rset} />);
    expect(wrapper.type()).to.eql('div');
  });

  it("renders a download button if there is a link", () => {
    const rset = {download_link: "/foo/example.zip"} ;
    const wrapper = render(<DownloadLink rset={rset} />);
    expect(wrapper.find('a')).to.have.length(1);
  });

  it("renders the correct download link", () => {
    process.env.NODE_ENV = 'local';
    const rset = {download_link: "/foo/example.zip"} ;
    const wrapper = shallow(<DownloadLink rset={rset} />);
    const expected = "http://localhost:7001/foo/example.zip";
    expect(wrapper.html().includes(expected)).to.be.true;
  });

  it("renders the correct download link in prod", () => {
    process.env.NODE_ENV = 'prod';
    const rset = {download_link: "https://example.com/foo/example.zip"} ;
    const wrapper = shallow(<DownloadLink rset={rset} />);
    const expected = "https://example.com/foo/example.zip";
    expect(wrapper.html().includes(expected)).to.be.true;
  });

  it("does not render a download button if there is no link", () => {
    const rset = {download_link: false} ;
    const wrapper = shallow(<DownloadLink rset={rset} />);
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.contains('Preparing download...')).to.be.true;
  });

});
