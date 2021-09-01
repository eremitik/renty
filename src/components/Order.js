import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postOrder } from "../actions/orderActions";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
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
  label: {
    marginTop: '10px',
    display: 'inline-block',
    width: '100%',
    textAlign: 'left',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor: 'blue',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1E90FF',
    },
  },
  buttonClear: {
    marginBottom: 10, 
  },
  downArrowButton: {
    border: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    '&:hover': {
      color: 'grey',
    }
  },
  downArrow: {
    width: '4%',
  },
  hideTextField: {
    display: 'none',
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
    selectedFile: "",
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

  const calcNights = (start, end) => {
    return parseInt((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24), 10)
  }

  let url;
  process.env.REACT_APP_ENVIRONMENT === "PROD" ? (url ='http://13.212.157.177/stripe/create-checkout-session') : (url = 'http://localhost:4000/stripe/create-checkout-session')

  const sendToStripe = async () => {
    const res = await fetch(`${url}/${order.price_id}/${calcNights(orderData.startDate, orderData.returnDate)}`, {
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
        { order ? <Typography className={classes.label}>{order.title}</Typography> : null }
        { order ? <Typography className={classes.label}>{order.description}</Typography> : null }
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handlePayment}>
        <br></br>
        <Typography className={classes.label}>Input Start date: </Typography>
        <TextField
          id="date"
          name="startDate"
          type="date"
          variant="outlined"
          // label="Start Date"
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
            selectedFile: order.selectedFile,
          })}
        />
        <br></br>
        <Typography className={classes.label}>Input Return date: </Typography>

        <TextField
          id="date"
          type="date"
          name="returnDate"
          variant="outlined"
          fullWidth
          onChange={(e) => setOrderData({ ...orderData, returnDate: e.target.value, })}
        />
        <TextField
          className={classes.hideTextField}
          id="numberNights"
          name="numberNights"
          variant="outlined"
          label="Number of nights calculated"
          value={calcNights(orderData.startDate, orderData.returnDate)}
          fullWidth
        />
        <TextField
          className={classes.hideTextField}
          id="name"
          type="text"
          name="name"
          variant="outlined"
          label="name"
          value={order.name}
          fullWidth
        />
        <TextField
          className={classes.hideTextField}
          id="email"
          type="text"
          name="email"
          variant="outlined"
          label="email"
          value={order.email}
          fullWidth
        />
        <TextField
          className={classes.hideTextField}
          id="message"
          type="text"
          name="message"
          variant="outlined"
          label="message"
          value={order.description}
          fullWidth
        />
        <TextField
          className={classes.hideTextField}
          id="subject"
          type="text"
          name="subject"
          variant="outlined"
          label="subject"
          value="Congrats on your rental."
          fullWidth
        />
        <TextField
          className={classes.hideTextField}
          id="recipient"
          type="text"
          name="recipient"
          variant="outlined"
          label="recipient"
          value={userInfo.email}
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