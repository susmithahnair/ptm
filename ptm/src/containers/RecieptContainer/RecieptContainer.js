import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, Dialog } from "@material-ui/core";
import ExpenseGroup from "../../components/ExpenseGroup/ExpenseGroup";
import { Receipt } from "../../components/Reciept";
import { Modal } from "../../components/Modal";
import useForms from "../../utils/useForms";
import ApiService from "../../services/ApiService";
import _ from "lodash";

const RecieptContainer = () => {
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
  const [conversionRates, setConversionRates] = useState();
  const submitReceipt = e => {};

  const handleSubmit = item => {
    inputs.value = Number(inputs.value);
    if (inputs.currency != "CAD") {
      let conversionRate = conversionRates[inputs.currency];
      inputs.currency = "CAD";
      inputs.value = inputs.value / conversionRate;
    }
    debugger;
    if (total + inputs.value > 1000) {
      setErrors("Total exceeded.");
      return;
    }

    setItems(prev => [...prev, inputs]);
    setShowModal(false);
  };

  useEffect(() => {
    ApiService.conversionRates().then(
      response =>
        response.status === 200 && setConversionRates(response.data.rates)
    );
  }, []);

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Typography align="right">
          <Button
            onClick={addReceipt}
            color="secondary"
            variant="contained"
            disabled={total >= 1000}
          >
            Add Receipt
          </Button>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ExpenseGroup items={items}></ExpenseGroup>
      </Grid>
      <Grid item xs={12}>
        <Typography align="right">Total: {total}</Typography>
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
  );
};

export default RecieptContainer;
