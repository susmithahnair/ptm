import React from "react";
import { shallow } from "enzyme";
import { findByTestAttribute } from "../../utils/testUtils";
import ExpenseItem from "./ExpenseItem";

const setup = (props = {}) => {
  const component = shallow(<ExpenseItem {...props} />);
  return component;
};

describe("Expense item component tests without props", () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  it("Should render without errors", () => {
    const wrapper = findByTestAttribute(component, "expenseItem");
    expect(wrapper.length).toBe(1);
  });
});

describe("Expense Item component tests with props", () => {
  let component;
  let initialProps = {
    description: "Flight Tickets",
    value: 700,
    currency: "CAD"
  };

  beforeEach(() => {
    component = setup(initialProps);
  });

  it("Should render Expense Item without errors", () => {
    let wrapper = findByTestAttribute(component, "expenseItemDescription");
    expect(wrapper.text()).toEqual(initialProps.description);
    wrapper = findByTestAttribute(component, "expenseItemValueCurrency");
    expect(wrapper.text()).toEqual(
      `${initialProps.value} ${initialProps.currency}`
    );
    expect(wrapper.length).toBe(1);
  });
});
