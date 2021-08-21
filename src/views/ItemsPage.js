import { useDispatch, useSelector } from 'react-redux'
import Items from "../components/Items";


export default function NotesPage() {

    const user = useSelector(state => state.user)

    return (
        <div>
            {user && user.name ? <p>Hello, {user.name}</p> : "User state not pulling in"}
            <Items />
        </div>
    );
}