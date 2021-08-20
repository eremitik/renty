import React from 'react'
import Item from './Item/Item'
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Grid } from '@material-ui/core';
// import { classExpression } from '@babel/types';

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
  const items = useSelector((state) => state.items);
  const classes = useStyles()

  return (
    !items.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {items.map((item) => (
          <Grid key={item._id} item xs={12} sm={2}>
            <Item item={item} />
          </Grid>
      ))}
      </Grid>
      )
    )
}

export default Items
