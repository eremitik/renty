import React from "react";
import moment from "moment";

import { Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


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

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}


export default function OrderItem ({ orderedItem, userInfo }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
 
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <Card className={classes.card} onClick={handleClick}>
      <CardMedia className={classes.media} title={orderedItem.title} image={orderedItem.selectedFile || 'https://d25tv1xepz39hi.cloudfront.net/2016-07-16/files/cat-sample_1313.jpg'} />
      <div className={classes.overlay}>
        <Typography variant="body2">posted {moment(orderedItem.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.details}>
        {/* <Typography variant="body2" color="textSecondary">{orderedItem.tags.map((tag) => `#${tag} `)}</Typography> */}
        <Typography variant="body2" color="textSecondary">User: {orderedItem.lenderName}</Typography>
      </div>
      <Typography className={classes.email} variant="h5" gutterBottom>{orderedItem.title}</Typography>
      <CardContent>
        {/* <Typography variant="body2" color="textSecondary" component="p">{orderedItem.description}</Typography> */}
        {/* { userInfo && userInfo.email !== orderedItem.email ? <button onClick={handlePayment}>¥{orderedItem.price} /night</button> : null } */}
      </CardContent>
      
      <CardActions className={classes.cardActions}>
      </CardActions>


      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={`This item is due on ${orderedItem.returnDate}!`}
        TransitionComponent={TransitionUp}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Card>
  )
}