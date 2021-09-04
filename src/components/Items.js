import React, { useEffect } from "react";
import Item from "./Item";
import { useDispatch, useSelector } from 'react-redux'
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

const Items = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  const itemList = useSelector(state => state.itemList)
  const { items } = itemList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const classes = useStyles();

  return (
    !items.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {items.map((item) => (
          <Grid key={item._id} item xs={12} sm={2}>
            <Item item={item} userInfo={userInfo}/>
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Items;