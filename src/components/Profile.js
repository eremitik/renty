import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "./Item.js";
import OrderItem from "./OrderItem.js";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Grid } from "@material-ui/core";
import { getItems } from "../actions/itemActions";
import { getOrder } from "../actions/orderActions";
import Wallet from './Wallet.js';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
    dispatch(getOrder());
  }, [dispatch]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const itemList = useSelector((state) => state.itemList);
  const { items } = itemList;

  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;

  const filterItems = (userEmail) => {
    return items.filter((item) => userEmail === item.email);
  };

  const orderItems = (userEmail) => {
    return orders.filter((order) => userEmail === order.renterEmail);
  };

  const filteredItems = filterItems(userInfo.email);
  const orderedItems = orderItems(userInfo.email);

  return (
    <div>
      <h1>Profile</h1>
      <h3>Name: {userInfo.name}</h3>
      <h3>Email: {userInfo.email}</h3>
      <Wallet />
      <br></br>
      <h1>Items you've rented:</h1>
      {!orders.length ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {orderedItems.map((orderedItem) => (
            <Grid key={orderedItem._id} item xs={12} sm={2}>
              <OrderItem orderedItem={orderedItem} userInfo={userInfo} />
            </Grid>
          ))}
        </Grid>
      )}
      <h1>Items you've posted for rent:</h1>
      {!items.length ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {filteredItems.map((item) => (
            <Grid key={item._id} item xs={12} sm={2}>
              <Item item={item} userInfo={userInfo} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
