import React from "react";
import { shallow, mount } from "enzyme";
import { findByTestAttribute } from "../../utils/testUtils";
import Receipt from "./Receipt";

const setup = (props = {}) => {
  const component = shallow(<Receipt {...props} />);
  return component;
};
const setupMount = (props = {}) => {
  const component = mount(<Receipt {...props} />);
  return component;
};

describe("Receipt component tests without props", () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  it("Should render without errors", () => {
    let wrapper = findByTestAttribute(component, "receiptModalContainer");
    expect(wrapper.length).toBe(1);
  });
});

describe("Receipt component renders with no items", () => {
  let component;
  let mockFunction;
  let initialProps = {
    inputs: {},
    currencies: [],
    errors: ""
  };

  beforeEach(() => {
    mockFunction = jest.fn();
    initialProps.handleInputChange = mockFunction;
    component = setup(initialProps);
  });

  it("Should render Expense Group without errors", () => {
    let wrapper = findByTestAttribute(component, "receiptModalContainer");
    expect(wrapper.length).toBe(1);
    let description = wrapper.find("[name='description']");
    expect(description.length).toBe(1);
    let value = wrapper.find("[name='value']");
    expect(value.length).toBe(1);
    let currency = wrapper.find("[name='currency']");
    expect(currency.length).toBe(1);
  });
});
