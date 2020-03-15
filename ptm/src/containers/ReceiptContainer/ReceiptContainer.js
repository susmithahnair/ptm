import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  MenuItem,
  Box,
  ListItem,
  Divider,
  makeStyles
} from "@material-ui/core";
import ExpenseGroup from "../../components/ExpenseGroup/ExpenseGroup";
import { Receipt } from "../../components/Reciept";
import { Modal } from "../../components/Modal";
import useForms from "../../utils/useForms";
import ApiService from "../../services/ApiService";
import _ from "lodash";

const useStyles = makeStyles(theme => ({
  listTotal: { display: "flex", justifyContent: "flex-end" },
  totalText: { fontWeight: "bold" }
}));

const ReceiptContainer = () => {
  let classes = useStyles();
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState("");

  const [total, setTotal] = useState(0);

  const initialInput = {
    description: "",
    currency: "",
    value: 0
  };

  useEffect(() => {
    calculateTotal();
  }, [items]);

  const calculateTotal = () => {
    let total = 0;
    _.forEach(items, item => {
      total += Number(item.value);
    });
    setTotal(total);
  };
  const { inputs, setInputs, handleInputChange } = useForms(initialInput);
  const [showModal, setShowModal] = useState(false);
  const addReceipt = e => {
    setShowModal(true);
    setErrors("");
    setInputs(initialInput);
  };
  const [conversionRates, setConversionRates] = useState({});
  const [globalCurrency, setGlobalCurrency] = useState("CAD");
  const [receiptLimit, setReceiptLimit] = useState(0);
  const submitReceipt = e => {
    console.log(items);
  };

  const handleSubmit = item => {
    inputs.value = Number(inputs.value);
    let conversionRate = conversionRates[inputs.currency];
    var convertedVal = inputs.value / conversionRate;
    let totalInCAD = total + convertedVal;

    if (totalInCAD > receiptLimit) {
      setErrors("Total exceeded.");
      return;
    }
    if (inputs.currency != globalCurrency) {
      inputs.currency = globalCurrency;
      inputs.value = convertedVal;
    }

    setItems(prev => [...prev, inputs]);
    setShowModal(false);
  };

  useEffect(() => {
    ApiService.conversionRates(globalCurrency).then(response => {
      response.status === 200 && setConversionRates(response.data.rates);
      setReceiptLimit(1000 / response.data.rates["CAD"]);
    });
  }, [globalCurrency]);

  useEffect(() => {
    let total = 0;
    _.forEach(items, item => {
      item.value = conversionRates[globalCurrency] * item.value;
      item.currency = globalCurrency;
      total += item.value;
    });
    setTotal(total);
  }, [globalCurrency]);

  return (
    <Box
      border={1}
      borderColor="primary.main"
      borderRadius="1rem"
      padding="2rem"
    >
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <TextField
            select
            label="Currency"
            name="currency"
            value={globalCurrency}
            onChange={e => setGlobalCurrency(e.target.value)}
            required
          >
            {_.map(Object.keys(conversionRates), currency => (
              <MenuItem value={currency} key={currency}>
                {currency}
              </MenuItem>
            ))}
          </TextField>
          <Typography align="right">
            <Button
              onClick={addReceipt}
              color="secondary"
              variant="contained"
              disabled={total >= receiptLimit}
            >
              Add Receipt
            </Button>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ExpenseGroup items={items} divider></ExpenseGroup>
          <Divider></Divider>
          <ListItem button className={classes.listTotal}>
            <Typography className={classes.totalText}>
              Total: {total} {globalCurrency}
            </Typography>
          </ListItem>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">
            <Button onClick={submitReceipt} variant="contained" color="primary">
              Submit
            </Button>
          </Typography>
        </Grid>
        {showModal && (
          <Modal
            maxWidth="md"
            fullWidth
            open={showModal}
            onClose={e => setShowModal(false)}
            handleSubmit={handleSubmit}
            title={"Add Receipt"}
          >
            <Receipt
              errors={errors}
              currencies={Object.keys(conversionRates)}
              inputs={inputs}
              handleInputChange={handleInputChange}
            ></Receipt>
          </Modal>
        )}
      </Grid>
    </Box>
  );
};

export default ReceiptContainer;
