import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'


export default class Credit extends Component {
    componentDidMount() {
        document.body.style.backgroundColor = "#fff";
    }
    render() {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="col-md-12">
                    <div className="row mt-4">
                        <h4>Credits</h4>
                    </div>
                    <div className="row mt-4">
                        <p className="font-weight-bold">Team Nosowsky</p>
                    </div>
                    <div className="row">
                        <ul>
                            <li>Dave Ackley</li>
                            <li>Chris Nosowsky</li>
                            <li>Lukas Richters</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
    }
}