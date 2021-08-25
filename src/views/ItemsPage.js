// import { useSelector } from 'react-redux'
import Items from "../components/Items";
import Search from "../components/Search";


export default function NotesPage() {

    // const user = useSelector(state => state.userLogin.userInfo)

    return (
        <div>
            {/* {user && user.name ? <p>Hello, {user.name}</p> : "Please log in to rent and create rentals."} */}
            <Search />
            <Items />
        </div>
    );
}