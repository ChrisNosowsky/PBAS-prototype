import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const menuItems = [
    {'Name': 'Prototype', 'Link': '/PBAS/Prototype','key': 1},
    {'Name': 'References', 'Link': '/PBAS/Bib','key': 2},
    {'Name': 'Credits', 'Link': '/PBAS/Credits', 'key': 3}
 ];

class Header extends Component {

    constructor(props) {
        super(props);
        this.scrollDiv = props.refProp

        this.currentStatePath = window.location.href.split('#')[1] ?? ''
        if (this.currentStatePath !== '') {
            this.currentStatePath = '#' + this.currentStatePath
        }

        this.state = {
            active: window.location.pathname + this.currentStatePath
        }
    }

    _handleClick(menuItem) { 
        this.setState({ active: menuItem });
    }

    render() {
        const activeStyle = {
            'background': 'linear-gradient(315deg, #B91372 65%, #6B0F1A 100%)',
            'WebkitBackgroundClip': 'text',
            'WebkitTextFillColor': 'transparent',
            'backgroundClip': 'text',
        };
        return (
        <Navbar collapseOnSelect expand="lg" className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to="/PBAS/Prototype">CSE 870 - PBAS</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
            {menuItems.map(menuItem => {
                return <Link 
                className="nav-link"
                key={menuItem.key}
                to={menuItem.Link}
                style={this.state.active === menuItem.Link ? activeStyle : {}} 
                onClick={this._handleClick.bind(this, menuItem.Link)}
                > 
                {menuItem.Name}
                </Link>
            }
            )}
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        )
    }
}

export default Header
