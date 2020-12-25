import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from './AuthOptions';

  // Source:
  // MERN Stack Tutorial with Auth (8 part series):
  // https://www.youtube.com/watch?v=4_ZiJGY5F38

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    toggleMenu() {
        this.setState({ menu: !this.state.menu })
    }

    render() {
        const show = (this.state.menu) ? "show" : "" ;
    return(
        
        // Navbar component and calls AuthOptions to display nav options based on logged in status
        <nav class = "navbar navbar-expand-lg" >
            <Link to="/" class="navbar-brand">Wish Upon a Star</Link>
            <button class="navbar-toggler custom-toggler" onClick={() => this.toggleMenu()} type="button" data-toggle="collapse" data-target=".navbar-nav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class={"collapse navbar-collapse " + show} id="navbarNav">
                <ul class="navbar-nav nav-pills ml-auto">
                    <AuthOptions />
                </ul>
            </div>
        </nav>
    )
    }
}

// export default withRouter(Navbar);
