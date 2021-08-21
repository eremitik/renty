import React from "react";
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";
import MBA from "../images/mba.jpg";

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
  creator: {
    padding: '0 16px',
  },
})

const Item = ({ item }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} title={item.title} image={MBA} />
      <div className={classes.overlay}>
        <Typography variant="h6">{item.title}</Typography>
        <Typography variant="body2">{moment(item.createAt).fromNow()}</Typography>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">{item.tags}</Typography>
        <Typography variant="body2" color="textSecondary">yoooooooooooo</Typography>
      </div>
      <Typography className={classes.creator} variant="h5" gutterBottom>{item.creator}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{item.description}</Typography>
        <button>RENT ME</button>
      </CardContent>
    </Card>
  )
}

export default Item;