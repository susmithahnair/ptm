import React from "react";
import _ from "lodash";
import { ExpenseItem } from "../ExpenseItem";
import { Typography, ListItem, Divider } from "@material-ui/core";

const ExpenseGroup = ({ items }) => {
  return items && items.length > 0 ? (
    _.map(items, (item, index) => (
      <React.Fragment key={index}>
        <ListItem button data-test="expenseGroupItems">
          <ExpenseItem
            description={item.description}
            value={item.value}
            currency={item.currency}
          ></ExpenseItem>
        </ListItem>
        {index !== items.length - 1 && <Divider light></Divider>}
      </React.Fragment>
    ))
  ) : (
    <Typography data-test="expenseGroup" color="primary" align="center">
      Please add Receipts.
    </Typography>
  );
};
export default ExpenseGroup;
