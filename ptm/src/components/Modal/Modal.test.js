import React from "react";
import { shallow } from "enzyme";
import Modal from "./Modal";
import { findByTestAttribute } from "../../utils/testUtils";
import { getByText } from "@testing-library/react";

const setup = (props = {}) => {
  const component = shallow(<Modal {...props} />);
  return component;
};

describe("Modal component tests without props", () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  it("Should render without errors", () => {
    const wrapper = findByTestAttribute(component, "modalComponent");
    expect(wrapper.length).toBe(1);
  });
});

describe("Modal component tests with props", () => {
  let component;
  let mockCallback;
  let initialProps = {
    open: false,
    title: "Modal title"
  };

  beforeEach(() => {
    mockCallback = jest.fn();
    initialProps.onClose = mockCallback;
    initialProps.handleSubmit = mockCallback;
    component = setup(initialProps);
  });

  it("Should render title without errors", () => {
    const wrapper = findByTestAttribute(component, "modalComponent");
    expect(component.find("#form-dialog-title").text()).toEqual(
      initialProps.title
    );
    expect(wrapper.length).toBe(1);
  });

  it("Should click all buttons without errors", () => {
    let wrapper = findByTestAttribute(component, "modalCloseButton");
    wrapper.simulate("click");
    wrapper = findByTestAttribute(component, "modalSubmitButton");
    wrapper.simulate("click");
    expect(mockCallback.mock.calls.length).toBe(2);
  });
});
