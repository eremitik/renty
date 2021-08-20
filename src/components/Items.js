import React, { useEffect, useContext, useState } from "react";
import Item from "./Item";
import { Context } from "../Store";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Grid } from '@material-ui/core';


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
    const classes = useStyles();
    const [state] = useContext(Context);
    const [items, setItems] = useState([]);
    const displayItems = async () => {
        const response = await axios.get("/items", {
            headers: { Authorization: `Bearer ${state.token}` },
        });
        setItems(response.data);
    };

    useEffect(() => {
        if (state.token) {
            displayItems();
        }
    }, [state.token]);


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



//     return (
//         <div>
//             <p>{state.token}</p>
//             {items.map((item) => (
//                 <Item key={item.id} item={item} />
//             ))}
//         </div>
//     );
// }

export default Items;