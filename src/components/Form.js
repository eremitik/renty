import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
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
  },
  buttonClear: {
    marginBottom: 10,
  }
}));

const Form = ({ currentId }) => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  const [itemData, setItemData] = useState({
    title: "", 
    description: "", 
    creator: userInfo.email,
    tags: "",
    price: "",
    selectedFile: "",
  })
  const classes = useStyles();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (post) setItemData(post);
  // }, [post])

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (currentId) {
      // dispatch(updatePost(currentId, itemData));
    // } else {
      dispatch(createItem(itemData));
      clear()
    // }
  }

  const clear = () => {
    setItemData({ 
    title: "", 
    description: "", 
    // creator: "",
    tags: "",
    price: "",
    selectedFile: "",
    })
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">Create a new rental posting</Typography>
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
        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={itemData.creator}
          onChange={(e) => setItemData({ ...itemData, creator: e.target.value })}
        /> */}
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={itemData.tags}
          onChange={(e) => setItemData({ ...itemData, tags: e.target.value })}
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
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setItemData({ ...itemData, selectedFile: base64 })}
          />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" size="large" type="submit" fullWidth>Submit</Button>
        <Button className={classes.buttonClear} variant="contained" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form;