import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../actions/itemActions";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    boxShadow: "none",
    width: "600px",
    textAlign: "center",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor: "blue",
    color: "white",
    "&:hover": {
      backgroundColor: "#1E90FF",
    },
  },
  buttonClear: {
    marginBottom: 10,
  },
}));

const Form = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();

  const [itemData, setItemData] = useState({
    title: "",
    description: "",
    email: userInfo.email,
    name: userInfo.name,
    tags: "",
    price: "",
    selectedFile: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  const redirect = () => {
    return history.push("/profile");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createItem(itemData));
    setTimeout(redirect, 2000);
  };

  const clear = () => {
    setItemData({
      title: "",
      description: "",
      // email: "",
      tags: "",
      price: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
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
          onChange={(e) =>
            setItemData({ ...itemData, description: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          placeholder="ex: laptop,macbook,apple"
          fullWidth
          value={itemData.tags}
          onChange={(e) =>
            setItemData({ ...itemData, tags: e.target.value.split(",") })
          }
        />
        <TextField
          name="price"
          variant="outlined"
          label="Price"
          fullWidth
          value={itemData.price}
          onChange={(e) => setItemData({ ...itemData, price: e.target.value })}
        />
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
          style={{ display: "none" }}
        />
        <label htmlFor="icon-button-file">
          Upload Image
          <IconButton
            color="primary"
            className={classes.button}
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonClear}
          variant="contained"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
