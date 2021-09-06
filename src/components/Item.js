import React from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "../actions/orderActions"
import { deleteItem } from "../actions/itemActions"
import { Link } from "react-router-dom";

import { Button, Card, CardActions, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backgroundBlendMode: 'darken',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
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
  metadata: {
    fontSize: '12px',
    color: 'grey',

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
    margin: '15px',
    marginBottom: '0px',
  },
  detailsTwo: {
    margin: '15px',
    marginBottom: '0px',
  },
  title: {
    fontSize: '18px',
  },
  name: {
    color: 'black',
    fontSize: '12px',
  },
  buyButton: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#F5F5F5',
    },
  },
  buyButtonText: {
    color: '#1E90FF',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
})

const Item = ({ item, userInfo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const grabInfo = () => {
    dispatch(createOrder(item))
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteItem(item._id))
      window.location.reload()
    }
  }


  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} title={item.title} image={item.selectedFile || 'https://d25tv1xepz39hi.cloudfront.net/2016-07-16/files/cat-sample_1313.jpg'} />
      <div className={classes.details}>
        <Typography className={classes.metadata} variant="body2" color="textSecondary">{item.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <div className={classes.detailsTwo}>
        <Typography className={classes.title} variant="body2">{item.title}</Typography>
        <Typography className={classes.name} variant="body2" >user: {item.name}</Typography>
        <Typography className={classes.metadata} variant="body2" color="textSecondary" component="p">{item.description}</Typography>
      </div>
      
      <CardActions className={classes.cardActions}>
        { userInfo && userInfo.email === item.email 
        ? <Button size="small" 
            onClick={handleDelete}>
            <DeleteIcon fontSize="small" />
          </Button> 
        : null}
        { userInfo && (userInfo.email !== item.email) && !item.rented
        ? <button className={classes.buyButton} onClick={grabInfo}><Link className={classes.buyButtonText} to="/order">{`¥${Intl.NumberFormat().format(item.price)} /night`}</Link></button> 
        : <button disabled={true} className={classes.buyButton}>out for rent</button> }
      </CardActions>
    </Card>
  )
}

export default Item;