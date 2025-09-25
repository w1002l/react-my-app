import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div>
            <h1>404 - page Not Found</h1>
            <p>oops! The page you are looking for does not exist.</p>
            <Link to='/books'>Back to Books.</Link>
        </div>
    )
}