import React from "react";
import _ from "lodash";
import { ExpenseItem } from "../ExpenseItem";

const ExpenseGroup = ({ items }) => {
  return _.map(items, item => (
    <ExpenseItem
      key={item.id}
      description={item.description}
      value={item.value}
      currency={item.currency}
    ></ExpenseItem>
  ));
};
export default ExpenseGroup;
