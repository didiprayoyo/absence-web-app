import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import styled from "styled-components";

const Nav = styled.nav`
    background: #63d471;
    height: 85px;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem cals((100vw - 1000px) / 2);
    z-index: 12;
    /* Third Nav
    justify-content: flex-start; */
`;

const NavLink = styled(Link)`
    color: #808080;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: #000000;
    }
`;

const Bars = styled(FaBars)`
    display: none;
    color: #808080;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    /* Second Nav
    margin-right: 24px;
    Third Nav
    width: 100vw;
    white-space: nowrap; */
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to="/" activeStyle>Home</NavLink>
                    <NavLink to="/about" activeStyle>About</NavLink>
                    <NavLink to="/contact" activeStyle>Contact</NavLink>
                    <NavLink to="/comment">Comment</NavLink>
                    <NavLink to="/image-search">Image Search</NavLink>
                    <NavLink to="/video-search">Video Search</NavLink>
                    <NavLink to="/playground" >Playground</NavLink>
                    <NavLink to="/redux-counter" >Redux Counter</NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

const BootstrapNavbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand disabled" aria-disabled="true" href="/">BOOTCAMP batch 8: Experiment with ReactJS</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* pake Link to, instead of a href */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/" activeStyle>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact" activeStyle>Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/comment">Comment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/image-search">Image Search</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/video-search">Video Search</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about" activeStyle>About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/playground" >Playground</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/redux-counter" >Redux Counter</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
};

export { BootstrapNavbar, Navbar };