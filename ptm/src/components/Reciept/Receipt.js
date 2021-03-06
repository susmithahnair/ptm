import React from "react";
import _ from "lodash";
import { Grid, TextField, MenuItem } from "@material-ui/core";

const Receipt = ({ inputs, handleInputChange, currencies, errors }) => {
  return (
    <Grid container justify="center" spacing={4}>
      <Grid item xs={12}>
        <TextField
          label="Description"
          name="description"
          value={inputs.description}
          onChange={handleInputChange}
          fullWidth
          required
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Amount"
          name="value"
          type="number"
          value={inputs.value}
          onChange={handleInputChange}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          select
          label="currency"
          name="currency"
          value={inputs.currency}
          onChange={handleInputChange}
          fullWidth
          required
        >
          {_.map(currencies, currency => (
            <MenuItem value={currency} key={currency}>
              {currency}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        {errors}
      </Grid>
    </Grid>
  );
};

export default Receipt;
