"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Container, Typography } from '@mui/material';

const URL = "http://43.204.189.209:8080";

const getErrorLists = (eMapStr) => {
  const eMap = JSON.parse(eMapStr);
  const eList = [];

  eMap.globalErrors.forEach((e) => eList.push(e));

  Object.keys(eMap.fieldErrors).forEach((f) => {
    eMap.fieldErrors[f].forEach((e) => eList.push(e));
  });

  eList.forEach((e) => console.error(e));
};

const fetchData = async (url, errorMessage) => {
    try {
      const response = await axios.get(url);
  
      if (response.status === 200) {
        return response.data;
      } else {
        console.error(`${errorMessage} Status code: ${response.status}`);
        return [];
      }
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };

const fetchBranchLocationIds = async () => {
    return fetchData(
      `${URL}/branchLocation`,
      'Failed to fetch branch locations.'
    ).then((response) => {
      const locations = response.branchLocations;
  
      if (Array.isArray(locations)) {
        return Object.fromEntries(
          locations.map((location) => [
            location.id,
            `${location.name}, ${location.company.name}`,
          ])
        );
      } else {
        console.error('Invalid response format for branch locations');
        return {};
      }
    });
  };
  
const fetchItemIds = async () => {
    return fetchData(`${URL}/item`, 'Failed to fetch items.').then((response) => {
      const items = response.items;
  
      if (Array.isArray(items)) {
        return Object.fromEntries(
          items.map((item) => [
            item.id,
            `${item.name}, ${item.batchNumber}`,
          ])
        );
      } else {
        console.error('Invalid response format for items');
        return {};
      }
    });
  };
  
  
  const fetchAddressIds = async () => {
    return fetchData(
      `${URL}/address`,
      'Failed to fetch address data.'
    ).then((response) => {
      const addresses = response.addresses;
  
      if (Array.isArray(addresses)) {
        return Object.fromEntries(
          addresses.map((address) => [
            address.addrId,
            `${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state}, ${address.country} - ${address.pincode}`,
          ])
        );
      } else {
        console.error('Invalid response format for addresses');
        return {};
      }
    });
  };

const FormSI = () => {
  const [branchLocations, setBranchLocations] = useState({});
  const [addresses, setAddresses] = useState({});
  const [items, setItems] = useState({});
  const [invoiceDate, setInvoiceDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [branchLocationId, setBranchLocationId] = useState('');
  const [billingAddressId, setBillingAddressId] = useState('');
  const [shippingAddressId, setShippingAddressId] = useState('');
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setBranchLocations(await fetchBranchLocationIds());
      setAddresses(await fetchAddressIds());
      setItems(await fetchItemIds());
      console.log("Branch Locations: ", branchLocations);
      console.log("Addresses: ", addresses);
      console.log("Items: ", items);
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    const branchLocationToSend = { id: branchLocationId };
    const billingAddressToSend = { addrId: billingAddressId };
    const shippingAddressToSend = { addrId: shippingAddressId };
    const orderItems = [{ item: { id: itemId }, quantity }];

    const invoiceData = {
      invoiceDate: String(invoiceDate),
      branchLocation: branchLocationToSend,
      billingAddress: billingAddressToSend,
      shippingAddress: shippingAddressToSend,
      customerName,
      orderItems,
    };
    console.log(invoiceData);

    try {
      const response = await axios.post(`${URL}/si`, invoiceData);

      if (response.status === 200) {
        console.log("Data submitted successfully!");
      } else {
        getErrorLists(response.data);
      }
    } catch (error) {
      // console.error('Error submitting data:', error);
      console.log(response.data)
      getErrorLists(response.data)
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sales Invoice Form
      </Typography>
      <TextField
        label="Invoice Date"
        type="date"
        value={invoiceDate}
        onChange={(e) => setInvoiceDate(e.target.value)}
        fullWidth
        style={{ marginBottom: 10 }}
      />
      <TextField
        label="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        fullWidth
        style={{ marginBottom: 10 }}
      />
      <FormControl fullWidth style={{ marginBottom: 10 }}>
        <InputLabel>Branch Location</InputLabel>
        <Select value={branchLocationId} onChange={(e) => setBranchLocationId(e.target.value)}>
          {Object.entries(branchLocations).map(([id, name]) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ marginBottom: 10 }}>
        <InputLabel>Billing Address</InputLabel>
        <Select value={billingAddressId} onChange={(e) => setBillingAddressId(e.target.value)}>
          {Object.entries(addresses).map(([id, address]) => (
            <MenuItem key={id} value={id}>
              {address}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ marginBottom: 10 }}>
        <InputLabel>Shipping Address</InputLabel>
        <Select value={shippingAddressId} onChange={(e) => setShippingAddressId(e.target.value)}>
          {Object.entries(addresses).map(([id, address]) => (
            <MenuItem key={id} value={id}>
              {address}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth style={{ marginBottom: 10 }}>
        <InputLabel>Item</InputLabel>
        <Select value={itemId} onChange={(e) => setItemId(e.target.value)}>
          {Object.entries(items).map(([id, item]) => (
            <MenuItem key={id} value={id}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        fullWidth
        style={{ marginBottom: 10 }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        style={{ marginTop: 10, backgroundColor: '#f50057', color: 'white' }}
        >
        Submit
        </Button>
    </Container>
  );
};

export default FormSI;
