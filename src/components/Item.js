import React from "react";

export default function Item({ item }) {
    return (
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
        </div>
    );
}
