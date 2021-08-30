import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { postOrder } from "../actions/orderActions";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import emailjs from 'emailjs-com';
import dotenv from "dotenv";
dotenv.config();


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
  const order  = itemOrder.tempOrder

  const [orderData, setOrderData] = useState({
    title: "",
    price_id: "",
    nightPrice: "",
    lenderEmail: "",
    lenderName: "",
    numberNights: "",
    startDate: "",
    returnDate: "",
    renterEmail: "",
    renterName: "",
    paid: true,
    totalPrice: "",
  })
 
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(process.env.REACT_APP_EMAIL_CLIENT, process.env.REACT_APP_EMAIL_TEMPLATE, e.target, process.env.REACT_APP_EMAIL_USER)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    }

  const sendToStripe = async () => {
    const res = await fetch(`http://localhost:4000/stripe/create-checkout-session/${order.price_id}`, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
          }
        })
        const body = await res.json()
        window.location.href = body.url
    }

  const handlePayment = async (e) => {
    e.preventDefault();

    // turning off emails for now
    // sendEmail(e)     
    dispatch(postOrder(orderData))
    setTimeout(sendToStripe, 2000)
  }

  return (
    <div>
    { order ? 
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handlePayment}>
        { order ? <Typography variant="h6">Book rental for: {order.title}</Typography> : null }
        { order ? <Typography variant="h6">Descirption: {order.description}</Typography> : null }
        <TextField
          id="date"
          name="startDate"
          type="date"
          variant="outlined"
          label="Start Date"
          fullWidth
          onChange={(e) => setOrderData({ 
            ...orderData, 
            startDate: e.target.value, 
            title: order.title, 
            price_id: order.price_id, 
            nightPrice: parseInt(order.price),
            lenderEmail: order.email,
            lenderName: order.name,
            renterEmail: userInfo.email,
            renterName: userInfo.name,
          })}
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
        <TextField
          id="name"
          type="text"
          name="name"
          variant="outlined"
          label="name"
          value={order.name}
          fullWidth
        />
        <TextField
          id="email"
          type="text"
          name="email"
          variant="outlined"
          label="email"
          value={order.email}
          fullWidth
        />
        <TextField
          id="message"
          type="text"
          name="message"
          variant="outlined"
          label="message"
          value={order.description}
          fullWidth
        />
        <TextField
          id="subject"
          type="text"
          name="subject"
          variant="outlined"
          label="subject"
          value="Congrats on your rental."
          fullWidth
        />
        <TextField
          id="recipient"
          type="text"
          name="recipient"
          variant="outlined"
          label="recipient"
          value="renty@internet.ru"
          fullWidth
        />
        <Button className={classes.buttonSubmit} variant="contained" size="large" type="submit" fullWidth>Submit</Button>
      </form>
    </Paper>

   : <button><Link to="/main">Go back</Link></button>  }

    </div>
  )
}

export default Order;