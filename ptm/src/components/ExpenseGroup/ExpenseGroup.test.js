import React from "react";
import { shallow, mount } from "enzyme";
import { findByTestAttribute } from "../../utils/testUtils";
import ExpenseGroup from "./ExpenseGroup";

const setup = (props = {}) => {
  const component = shallow(<ExpenseGroup {...props} />);
  return component;
};
const setupMount = (props = {}) => {
  const component = mount(<ExpenseGroup {...props} />);
  return component;
};

describe("Expense Group component tests without props", () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  it("Should render without errors", () => {
    let wrapper = findByTestAttribute(component, "expenseGroup");
    expect(wrapper.length).toBe(1);
    wrapper = findByTestAttribute(component, "expenseGroupItems");
    expect(wrapper.length).toBe(0);
  });
});

describe("Expense Group component renders with no items", () => {
  let component;
  let initialProps = {
    items: []
  };

  beforeEach(() => {
    component = setup(initialProps);
  });

  it("Should render Expense Group without errors", () => {
    let wrapper = findByTestAttribute(component, "expenseGroup");
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toEqual("Please add Receipts.");
    wrapper = findByTestAttribute(component, "expenseItemValueCurrency");
    expect(wrapper.length).toBe(0);
  });
});

describe("Expense Group component renders with items", () => {
  let component;
  let initialProps = {
    items: [
      {
        description: "Flight Tickets",
        value: 700,
        currency: "CAD"
      },
      {
        description: "Hotel Reservation",
        value: 500,
        currency: "CAD"
      }
    ]
  };

  beforeEach(() => {
    component = setupMount(initialProps);
  });

  it("Should render Expense Group without errors", () => {
    let wrapper = findByTestAttribute(component, "expenseGroup");
    expect(wrapper.length).toBe(0);
    wrapper = findByTestAttribute(component, "expenseGroupItems");
    expect(wrapper.find("ExpenseItem").length).toBe(2);
  });

  afterEach(() => {
    component.unmount();
  });
});
