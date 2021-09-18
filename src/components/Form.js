import React, { useState } from "react";
import { TextField, Button, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../actions/itemActions";
import { makeStyles } from '@material-ui/core/styles';

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
    '&:hover': {
      backgroundColor: '#1E90FF',
    }
  },
  buttonClear: {
    marginBottom: 10,
  }
}));

export default function Form() {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [itemData, setItemData] = useState({
    title: "", 
    description: "", 
    email: userInfo.email,
    name: userInfo.name,
    tags: "",
    rented: false,
    price: "",
    selectedFile: "",
  })

  const redirect = () => {
    return history.push('/profile')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createItem(itemData));
    setTimeout(redirect, 2000)
  }

  const clear = () => {
    setItemData({ 
    title: "", 
    description: "", 
    tags: "",
    price: "",
    selectedFile: "",
    })
  }

  return (
    <Paper className={classes.paper}>
      <h1>Share your item</h1>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setItemData({ ...itemData, selectedFile: base64 })}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={itemData.title}
          onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          value={itemData.description}
          onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          placeholder="ex: laptop,macbook,apple"
          fullWidth
          value={itemData.tags}
          onChange={(e) => setItemData({ ...itemData, tags: e.target.value.split(',') })}
        />
        <TextField
          name="price"
          variant="outlined"
          label="Price"
          fullWidth
          value={itemData.price}
          onChange={(e) => setItemData({ ...itemData, price: e.target.value })}
        />
        <div className={classes.fileInput}>
          <Button className={classes.buttonSubmit} variant="contained" size="large" type="submit" fullWidth>Submit</Button>
          <Button className={classes.buttonClear} variant="contained" size="small" onClick={clear} fullWidth>Clear</Button>
        </div>
      </form>
    </Paper>
  )
}