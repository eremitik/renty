import React from "react";
import moment from "moment";

import { Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  email: {
    padding: '0 16px',
  },
})

const OrderItem = ({ item, userInfo }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} title={item.title} image={item.selectedFile || 'https://d25tv1xepz39hi.cloudfront.net/2016-07-16/files/cat-sample_1313.jpg'} />
      <div className={classes.overlay}>
        {/* <Typography variant="h6">{item.title}</Typography> */}
        <Typography variant="body2">posted {moment(item.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.details}>
        {/* <Typography variant="body2" color="textSecondary">{item.tags.map((tag) => `#${tag} `)}</Typography> */}
        <Typography variant="body2" color="textSecondary">User: {item.lenderName}</Typography>
      </div>
      <Typography className={classes.email} variant="h5" gutterBottom>{item.title}</Typography>
      <CardContent>
        {/* <Typography variant="body2" color="textSecondary" component="p">{item.description}</Typography> */}
        {/* { userInfo && userInfo.email !== item.email ? <button onClick={handlePayment}>¥{item.price} /night</button> : null } */}
      </CardContent>
      
      <CardActions className={classes.cardActions}>
      </CardActions>
    </Card>
  )
}

export default OrderItem;