import CartButton from "../cart/CartButton";
import classes from './MainHeader.module.css';
const MainHeader = () => {
    return (
        <header className={classes.header}>
            <h2>Sabji-Mandi</h2>
            <nav>
                <ul>
                    <li><CartButton></CartButton></li>
                </ul>
            </nav>
        </header>
    );
}
export default MainHeader;