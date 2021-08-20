import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Store";
import axios from "axios";
import Item from "./Item";

export default function Items() {
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
        <div>
            <p>{state.token}</p>
            {items.map((item) => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    );
}