import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { postOrder } from "../actions/itemActions";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    boxShadow: 'none',
    width: '600px',
    textAlign: 'center',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor: 'blue',
    color: 'white',
  },
  buttonClear: {
    marginBottom: 10, 
  }
}));

const Order = () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const itemOrder = useSelector(state => state.createOrder)
  const order = itemOrder.item

  const [orderData, setOrderData] = useState({
    title: order.title,
    price_id: order.price_id,
    nightPrice: parseInt(order.price),
    lenderEmail: order.email,
    lenderName: order.name,
    numberNights: "",
    startDate: "",
    returnDate: "",
    renterEmail: userInfo.email,
    renterName: userInfo.name,
    paid: true,
    totalPrice: "",
  })
  

  const handlePayment = async () => {
   
      dispatch(postOrder(orderData))

      const res = await fetch(`http://localhost:4000/stripe/create-checkout-session/${order.price_id}`, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
          }
        })
        const body = await res.json()
        window.location.href = body.url
  }

  return (
    <Paper className={classes.paper}>
      {/* <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}> */}
        { order ? <Typography variant="h6">Book rental for: {order.title}</Typography> : null }
        { order ? <Typography variant="h6">Descirption: {order.description}</Typography> : null }
        <TextField
          id="date"
          name="startDate"
          type="date"
          variant="outlined"
          label="Start Date"
          fullWidth
          onChange={(e) => setOrderData({ ...orderData, startDate: e.target.value })}
        />
        <TextField
          id="date"
          type="date"
          name="returnDate"
          variant="outlined"
          label="Return Date"
          fullWidth
          onChange={(e) => setOrderData({ ...orderData, returnDate: e.target.value, })}
        />
        <div className={classes.fileInput}>
        </div>
        { order ? <Button className={classes.buttonSubmit} variant="contained" size="large" type="submit" fullWidth onClick={handlePayment}>Submit</Button> : null }
       { !order ? <button><Link to="/main">Go back</Link></button> : null } 
      {/* </form> */}
    </Paper>
  )
}

export default Order;