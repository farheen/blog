import React, { useState } from 'react';
import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { text: 'Home', to: '/' },
        { text: 'Blogs', to: '/blogs' },
        { text: 'Projects', to: '/projects' },
        { text: 'Books', to: '/books' }, // Added "Books" link
    ];

    return (
        <Container maxWidth="lg" className="bg-white shadow-md">
            <Grid container alignItems="center" justifyContent="space-between" className="h-16">
                {/* Logo */}
                <Grid item>
                    <Typography
                        variant="h5"
                        color="primary"
                        component={Link}
                        to="/"
                        style={{ fontWeight: 'bold', textDecoration: 'none' }}
                    >
                        {/* Logo with text */}
                        <img 
                            src="/images/The_Independent_logo.png" 
                            alt="Flame Icon" 
                            className="icon" 
                            style={{ height: '30px', marginRight: '8px', verticalAlign: 'middle' }} 
                        />
                        <span className="fiercely" style={{ fontWeight: 'bold' }}>Fiercely</span>
                        <span className="independent" style={{ fontWeight: 'lighter' }}>Independent</span>
                    </Typography>
                </Grid>

                {/* Navigation Links (hidden on small screens) */}
                <Grid item className="hidden md:flex">
                    <Grid container spacing={2}>
                        {navLinks.map(({ text, to }) => (
                            <Grid item key={text}>
                                <Typography
                                    variant="body1"
                                    component={Link}
                                    to={to}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#4A4A4A',
                                        transition: 'color 0.3s',
                                    }}
                                    className="hover:text-blue-600"
                                >
                                    {text}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Mobile Menu Button */}
                <Grid item className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        style={{ border: 'none', background: 'none' }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </Grid>
            </Grid>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <Grid container direction="column" className="md:hidden">
                    {navLinks.map(({ text, to }) => (
                        <Grid item key={text}>
                            <Typography
                                variant="body1"
                                component={Link}
                                to={to}
                                style={{
                                    textDecoration: 'none',
                                    padding: '8px 16px',
                                    display: 'block',
                                    color: '#4A4A4A',
                                }}
                                className="hover:bg-gray-200"
                            >
                                {text}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default Navbar;
