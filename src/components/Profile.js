import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Item from "./Item.js";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Grid } from '@material-ui/core';
import { getItems } from "../actions/itemActions";


const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
}))

export default function Profile() {
  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const itemList = useSelector(state => state.itemList)
  const { items } = itemList

  const filterItems = (userEmail) => {
    return items.filter((item) => userEmail === (item.email))
  }

  const filteredItems = filterItems(userInfo.email)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  const classes = useStyles();

  return (
    <div>
      <h1>Profile</h1>
      <h3>Name: {userInfo.name}</h3>
      <h3>Email: {userInfo.email}</h3>
      <br></br>
      <h1>Items you've posted for rent:</h1>
      { !items.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {filteredItems.map((item) => (
          <Grid key={item._id} item xs={12} sm={2}>
            <Item item={item} userInfo={userInfo}/>
          </Grid>
        ))}
      </Grid>
    )}
    <h1>Items you've rented:</h1>
    <h4>work in progress.</h4>
    </div>
  )
}