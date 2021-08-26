import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
// import { createItem } from "../actions/itemActions";
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

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const itemOrder = useSelector(state => state.createOrder)
  const order = itemOrder.item

  console.log("redux state order: ", order)

  // const [itemData, setItemData] = useState({
  //   title: "", 
  //   description: "", 
  //   email: userInfo.email,
  //   name: userInfo.name,
  //   tags: "",
  //   price: "",
  //   selectedFile: "",
  // })
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(createItem(itemData));
    // clear()
  }

  // const clear = () => {
  //   setItemData({ 
  //   title: "", 
  //   description: "", 
  //   // email: "",
  //   tags: "",
  //   price: "",
  //   selectedFile: "",
  //   })
  // }

  // useEffect(() => {
  //   dispatch(getItems())

  // }, [dispatch]

  const grabInfo = () => {
    console.log(order)
  }

  return (
    <Paper className={classes.paper}>
      {/* <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}> */}
        { order ? <Typography variant="h6">Book rental for: {order.title}</Typography> : null }
        { order ? <Typography variant="h6">Descirption: {order.description}</Typography> : null }
        {/* <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={order.title}
          // onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          // value={itemData.description}
          // onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          // value={itemData.tags}
          // onChange={(e) => setItemData({ ...itemData, tags: e.target.value.split(',') })}
        />
        <TextField
          name="price"
          variant="outlined"
          label="Price"
          fullWidth
          // value={itemData.price}
          // onChange={(e) => setItemData({ ...itemData, price: e.target.value })}
        /> */}
        <div className={classes.fileInput}>
        </div>
        { order ? <Button className={classes.buttonSubmit} variant="contained" size="large" type="submit" fullWidth>Submit</Button> : null }
        {/* <Button className={classes.buttonClear} variant="contained" size="small" onClick={clear} fullWidth>Clear</Button> */}
       { !order ? <button><Link to="/main">Go back</Link></button> : null } 
      {/* </form> */}
    </Paper>
  )
}

export default Order;