import React, { useContext } from "react";
import Items from "../components/Items";
import { Context } from "../Store";

export default function NotesPage() {
    const [state] = useContext(Context);

    return (
        <div>
            {state.user && state.user.name ? <p>Hello, {state.user.name}</p> : ""}
            <Items />
        </div>
    );
}