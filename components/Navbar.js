import Link from 'next/link';


const Navbar = () => {
    return (
        <nav>
            <Link href="/">Welcome</Link>
            <Link href="/my-collection">My Collection</Link>
            <Link href="/search">Search</Link>
            <Link href="/signup">Sign Up/Log In</Link>
        </nav>
    );
};

export default Navbar;