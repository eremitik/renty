import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { postOrder } from "../actions/orderActions";
import { updateItem } from "../actions/itemActions";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { Link } from "react-router-dom";
import emailjs from 'emailjs-com';
import { ethers } from 'ethers';
import dotenv from "dotenv";
dotenv.config();


let url;
process.env.REACT_APP_ENVIRONMENT === "PROD" ? (url = 'http://13.212.157.177/stripe/create-checkout-session') : (url = 'http://localhost:4000/stripe/create-checkout-session')


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
    fontWeight: 800,
  },
  sublabel: {
    textAlign: 'left',
    color: 'black',
    fontWeight: 600,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonSubmit: {
    width: '100%',
    marginBottom: 10,
    marginTop: '20px',
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
  },
  formControl: {
    width: '100%',
    textAlign: 'left',
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  radioSelect: {
    color: 'black',
    width: '100%',
    textAlign: 'left',
    marginTop: '20px',
  },
}));

const Order = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory()
  const [error, setError] = useState();
  const [txs, setTxs] = useState();
  const [payment, setPayment] = useState("crypto");


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const itemOrder = useSelector(state => state.createOrder)
  const order = itemOrder.tempOrder

  const itemList = useSelector(state => state.itemList)
  const { items } = itemList

  const [orderData, setOrderData] = useState({
    title: "",
    price_id: "",
    nightPrice: "",
    lenderEmail: "",
    lenderName: "",
    numberNights: 0,
    startDate: "",
    returnDate: "",
    renterEmail: "",
    renterName: "",
    paid: true,
    totalPrice: "",
    selectedFile: "",
  })

  const ETHJPY = 412633   // spot rate for ETHPY, can make dynamic in the future

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

  const handleEthPayment = async () => {
    setError()
    await startEthPayment({
      setError,
      setTxs,
      ether: `${(totalPrice / ETHJPY).toFixed(5)}`,
      addr: "0x98DfcD53E4d52B6A6dBF85054A7A95B07De2C88a", // Renty's wallet
    })
  }

  const startEthPayment = async ({ setError, setTxs, ether, addr }) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found, please install MetaMask for best experience!");

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await window.ethereum.send("eth_requestAccounts")
      const signer = provider.getSigner()
      ethers.utils.getAddress(addr)
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      })
      setTxs(tx.hash)
      dispatch(postOrder({ ...orderData, txhash: tx.hash, ethprice: ether }))
      setTimeout(redirect, 1000)
    } catch (err) {
      setError(err.message)
    }
  }

  const redirect = () => {
    return history.push('/profile')
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const itemToUpdate = items.filter(item => item.price_id === orderData.price_id)
    dispatch(updateItem((itemToUpdate[0]._id), ({ rented: true })))


    if (payment === "credit") {
      // sendEmail(e) // turn off emails here
      dispatch(postOrder(orderData))
      setTimeout(sendToStripe, 2000)

    } else {
      // sendEmail(e) // turn off emails here
      handleEthPayment()
    }
  }

  const handlePaymentMethod = (e) => {
    setPayment(e.target.value)
  }

  const totalPrice = orderData.nightPrice * calcNights(orderData.startDate, orderData.returnDate)

  return (
    <div>

      {order ?
        <Paper className={classes.paper}>
          <h1>Borrow an item</h1>
          {order ? <Typography className={classes.label}>{order.title}</Typography> : null}
          {order ? <Typography className={classes.sublabel}>{order.description}</Typography> : null}
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handlePaymentSubmit}>
            <br></br>
            <Typography className={classes.label}>Input Start date: </Typography>
            <TextField
              id="startdate"
              name="startDate"
              type="date"
              variant="outlined"
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
              id="returndate"
              type="date"
              name="returnDate"
              variant="outlined"
              fullWidth
              onChange={(e) => setOrderData({ ...orderData, returnDate: e.target.value, })}
            />
            <Typography className={classes.label}>Total rental nights: {calcNights(orderData.startDate, orderData.returnDate) ? calcNights(orderData.startDate, orderData.returnDate) : 0}</Typography>
            <TextField
              className={classes.hideTextField}
              id="numberNights"
              name="numberNights"
              variant="outlined"
              label="Number of nights calculated"
              value={totalPrice ? totalPrice : 0}
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

            <FormControl className={classes.radioSelect} component="fieldset" >
              <FormLabel className={classes.label} component="legend">Payment Method</FormLabel>
                <RadioGroup row value={payment} onChange={handlePaymentMethod}>
                  <FormControlLabel value="credit" control={<Radio color="primary" />} label="Credit" />
                  <FormControlLabel value="crypto" control={<Radio color="primary" />} label="Crypto" />
                </RadioGroup>
              </FormControl>

            <Button className={classes.buttonSubmit} disabled={totalPrice ? false : true} variant="contained" size="large" type="submit">
              {!totalPrice ? "Please select dates" : payment === "credit" 
                ? `Pay with credit: ${`¥` + Intl.NumberFormat().format(totalPrice)}` 
                : `Pay now in ETH: ${(totalPrice / ETHJPY).toFixed(5)}`}
            </Button>
          </form>
          <p>{error}</p>
          <p>{txs && `Your transaction hash: ${txs}`}</p>
        </Paper>

        : <button><Link to="/main">Go back</Link></button>}

    </div>
  )
}

export default Order;