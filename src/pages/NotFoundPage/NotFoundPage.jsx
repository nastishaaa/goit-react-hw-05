import css from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return(
        <div className={css.content}>
            <h1>Not found page</h1>
            <h2>Go back to <Link className={css.a} to="/">Home</Link></h2>
        </div>
    )
}