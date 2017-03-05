// Unit tests for DownloadLink component
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { isPositiveNumber } from "../src/js/views/ResponseSets/Create"
import { notEmpty } from "../src/js/views/ResponseSets/Create"
import { dateRangeIsValid } from "../src/js/views/ResponseSets/Create"
import { NumericInput } from "../src/js/views/ResponseSets/Create"
import { StringInput } from "../src/js/views/ResponseSets/Create"
import { DropDownInput } from "../src/js/views/ResponseSets/Create"
import { DatePickerInput } from "../src/js/views/ResponseSets/Create"

describe("isPositiveNumber", () => {

  it("determines 100 is a positive number", () => {
    var error = ""
    const fakeInvalidate = function (msg) {error=msg;};
    const value = isPositiveNumber('test', 100, true, fakeInvalidate);
    expect(value).to.eql('success');
    expect(error).to.eql('');
  });

  it("determines 100 is a positive number when not required", () => {
    var error = ""
    const fakeInvalidate = function (msg) {error=msg;};
    const value = isPositiveNumber('test', 100, false, fakeInvalidate);
    expect(value).to.eql('success');
    expect(error).to.eql('');
  });

  it("determines 'foo' is not a positive number", () => {
    var error = ""
    const fakeInvalidate = function (msg) {error=msg;};
    const value = isPositiveNumber('test', 'foo', true, fakeInvalidate);
    expect(value).to.eql('error');
    expect(error).to.eql("test: 'foo' is not a positive number");
  });

  it("determines 'foo' is not a positive number when not required", () => {
    var error = ""
    const fakeInvalidate = function (msg) {error=msg;};
    const value = isPositiveNumber('test', 'foo', false, fakeInvalidate);
    expect(value).to.eql('error');
    expect(error).to.eql("test: 'foo' is not a positive number");
  });

  it("returns nothing when not required and empty", () => {
    var error = ""
    const fakeInvalidate = function (msg) {error=msg;};
    const value = isPositiveNumber('test', '', false, fakeInvalidate);
    expect(typeof(value)).to.eql('undefined');
    expect(error).to.eql('');
  });

  it("returns error when required and empty", () => {
    var error = ""
    const fakeInvalidate = function (msg) {error=msg;};
    const value = isPositiveNumber('test', '', true, fakeInvalidate);
    expect(value).to.eql('error');
    expect(error).to.eql("test: '' is not a positive number");
  });

});

describe("notEmpty", () => {

  it("determines 'foo' is not empty", () => {
    var error = ""
    const fakeInvalidate = function (msg) {error=msg;};
    const value = notEmpty('test', 'foo', fakeInvalidate);
    expect(value).to.eql('success');
    expect(error).to.eql('');
  });

  it("determines '' is empty", () => {
    var error = ""
    const fakeInvalidate = function (msg) {error=msg;};
    const value = notEmpty('test', '', fakeInvalidate);
    expect(value).to.eql('error');
    expect(error).to.eql("'test' is empty");
  });
});

describe("dateRangeIsValid", () => {

  it("determines that 2016-11-01 to 2016-11-10 is valid", () => {
    const value = dateRangeIsValid('2016-11-01', '2016-11-10');
    expect(value).to.be.true;
  });

  it("determines that 2016-11-21 to 2016-11-10 is not valid", () => {
    const value = dateRangeIsValid('2016-11-21', '2016-11-10');
    expect(value).to.be.false;
  });

});

describe("<NumericInput />", () => {

  it("renders a label and input", () => {
    const name = 'foo' ;
    const form = {
        value: '100',
        required: true,
        label: 'numeric-label'
    };
    const listener = {
        disabled: false,
        onChange: function() { },
        onInvalid: function() { }
    };
    const wrapper = render(<NumericInput
        name={name} form={form} listener={listener} />);

    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find('input')).to.have.length(1);
  });

  it("renders the correct form input", () => {
    const name = 'foo' ;
    const form = {
        value: '100',
        required: true,
        label: 'numeric-label'
    };
    const listener = {
        disabled: false,
        onChange: function() { },
        onInvalid: function() { }
    };
    const wrapper = shallow(<NumericInput
        name={name} form={form} listener={listener} />);
    expect(wrapper.html().includes('foo')).to.be.true;
    expect(wrapper.html().includes('numeric-label')).to.be.true;
    expect(wrapper.html().includes('value="100"')).to.be.true;
    expect(wrapper.html().includes('disabled')).to.be.false;
  });

  it("renders a disabled input when disabled", () => {
    const name = 'foo' ;
    const form = {
        value: '100',
        required: true,
        label: 'numeric-label'
    };
    const listener = {
        disabled: true,
        onChange: function() { },
        onInvalid: function() { }
    };
    const wrapper = shallow(<NumericInput
        name={name} form={form} listener={listener} />);
    expect(wrapper.html().includes('disabled')).to.be.true;
  });

});

describe("<StringInput />", () => {

  it("renders a label and input", () => {
    const name = 'foo' ;
    const form = {
        value: '100',
        required: true,
        label: 'numeric-label'
    };
    const listener = {
        disabled: false,
        onChange: function() { },
        onInvalid: function() { }
    };
    const wrapper = render(<StringInput
        name={name} form={form} listener={listener} />);

    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find('input')).to.have.length(1);
  });

  it("renders the correct form input", () => {
    const name = 'foo' ;
    const form = {
        value: 'foo',
        required: true,
        label: 'string-label'
    };
    const listener = {
        disabled: false,
        onChange: function() { },
        onInvalid: function() { }
    };
    const wrapper = shallow(<StringInput
        name={name} form={form} listener={listener} />);
    expect(wrapper.html().includes('foo')).to.be.true;
    expect(wrapper.html().includes('string-label')).to.be.true;
    expect(wrapper.html().includes('value="foo"')).to.be.true;
    expect(wrapper.html().includes('disabled')).to.be.false;
  });

  it("renders a disabled input when disabled", () => {
    const name = 'foo' ;
    const form = {
        value: '100',
        required: true,
        label: 'numeric-label'
    };
    const listener = {
        disabled: true,
        onChange: function() { },
        onInvalid: function() { }
    };
    const wrapper = shallow(<StringInput
        name={name} form={form} listener={listener} />);
    expect(wrapper.html().includes('disabled')).to.be.true;
  });

});

describe("<DropDownInput />", () => {

  it("renders a label and select", () => {
    const name = 'foo' ;
    const form = {
        value: '100',
        required: true,
        label: 'foo-label',
        options: [
            'aaa',
            'bbb'
        ]
    };
    const listener = {
        disabled: false,
        onChange: function() { },
        onInvalid: function() { }
    };
    const wrapper = render(<DropDownInput
        name={name} form={form} listener={listener} />);

    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find('select')).to.have.length(1);
  });

  it("renders a disabled input when disabled", () => {
    const name = 'foo' ;
    const form = {
        value: '100',
        required: true,
        label: 'foo-label',
        options: [
            'aaa',
            'bbb'
        ]
    };
    const listener = {
        disabled: true,
        onChange: function() { },
        onInvalid: function() { }
    };
    const wrapper = shallow(<DropDownInput
        name={name} form={form} listener={listener} />);
    expect(wrapper.html().includes('disabled')).to.be.true;
  });

});

describe("<DatePickerInput />", () => {

  it("renders a label and input", () => {
    const name = 'foo' ;
    const form = {
        value: '2016-10-01 11:12:33',
        required: true,
        label: 'foo-label',
        options: [
            'aaa',
            'bbb'
        ]
    };
    const listener = {
        disabled: false,
        onChange: function() { },
        onInvalid: function() { }
    };
    const wrapper = render(<DatePickerInput
        name={name} form={form} listener={listener} />);

    expect(wrapper.html().includes('<label')).to.be.true;
    expect(wrapper.html().includes('<input')).to.be.true;
  });

  it("renders a disabled input when disabled", () => {
    const name = 'foo' ;
    const form = {
        value: '2016-10-01 11:12:33',
        required: true,
        label: 'foo-label',
        options: [
            'aaa',
            'bbb'
        ]
    };
    const listener = {
        disabled: true,
        onChange: function() { },
        onInvalid: function() { }
    };
    const wrapper = shallow(<DatePickerInput
        name={name} form={form} listener={listener} />);
    expect(wrapper.html().includes('disabled')).to.be.true;
  });

});
