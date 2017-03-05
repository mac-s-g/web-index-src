// Unit tests for DeleteModal component
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { Modal } from 'react-bootstrap';
import DeleteModal from "../src/js/views/ResponseSets/components/DeleteSetDialogue";

describe("<DeleteModal />", () => {
  const setId = "1234abcd-1234-abcd-1234-abcd1234abcd";
  const setName = "a simple set";
  const show = true;
  const wrapper = shallow(                
    <DeleteModal 
    setId={setId} 
    setName={setName} 
    showModal={show} />
  );

  it("renders a bootstrap modal component", () => {
    expect(wrapper.type()).to.eql(Modal);
  });

  it("modal renders two buttons", () => {
    expect(wrapper.find('Button')).to.have.length(2);
  });

  it("modal title says 'Confirm Delete'", () => {
    expect(wrapper.find('ModalTitle').contains(<div>Confirm Delete</div>)).to.be.true;
  });

  it('simulates close modal click', () => {
    expect(wrapper.find('Modal').node.props.show).to.be.true;
    wrapper.find('Button').find('#modal-close-btn').simulate('click')
    expect(wrapper.find('Modal').node.props.show).to.be.false;
  });

});
