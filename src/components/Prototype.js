import React, { Component } from 'react'
import warning from '../assets/Prototype/pslight.png'
import Header from './Header';
import Footer from './Footer';

export class Prototype extends Component {

    
    constructor(props) {
        super(props);
        this.state = {timer: null, speed: 0,
            background: "start-background",
            engineToggled: false,
            hidden: "hidden", start: "hidden", warning: false};
        this.increaseSpeed = this.increaseSpeed.bind(this);
        this.decreaseSpeed = this.decreaseSpeed.bind(this);
        this.resetScreen = this.resetScreen.bind(this);
        this.toggleEngine = this.toggleEngine.bind(this);
        this.startSimulation = this.startSimulation.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.setSpeed = this.setSpeed.bind(this)
    }

    startSimulation() {
        this.setState({background: "pbas-background", start: ""})
        this.startTimer()
    }

    startTimer() {
        var sec = 0;
        function pad ( val ) { return val > 9 ? val : "0" + val; }
        var timerC = setInterval( function(){
            document.getElementById("seconds").innerHTML=pad(++sec%60);
            document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
        }, 1000);
        this.setState({timer: timerC})
    }

    componentDidMount() {
        document.body.style.backgroundColor = "#252525";
    }

    componentWillUnmount() {
        clearInterval ( this.state.timer );
    }
      
    increaseSpeed() {
        if (this.state.speed < 100) {
            this.setState({ speed: this.state.speed + 5} );
        }
            
    }

    decreaseSpeed() {
        if (this.state.speed > 0) {
            this.setState({ speed: this.state.speed - 5} );
        }
            
    }

    setSpeed() {
        if (this.state.speed < 50)
            this.increaseSpeed()
        else if (this.state.speed > 50)
            this.decreaseSpeed()
    }


    toggleEngine() {
        if(this.state.engineToggled) {
            this.setState({speed: 0,
                engineToggled: false, hidden: "hidden", warning: false })
        } else {
            this.setState({engineToggled: true,  hidden: ""})
        }
    }

    resetScreen() {
        alert("Simulation has reset.")
        clearInterval ( this.state.timer );
        this.startTimer()
        this.setState({speed: 0,
            engineToggled: false, 
            hidden: "hidden", start: "", warning: false})
    }

    render() {
        let startSimButton;
        let speedLimit;
        let warningButton;

        if (this.state.start) {
            startSimButton = 
            <div>
                <p className="start-text">Pedestrian Backup Assist System Prototype</p>
                <button className={"simstart btn btn-success"} onClick={this.startSimulation}>Start Simulation</button>
            </div>
        }

        if (this.state.warning) {
            warningButton = <img className="warning-light" src={warning} alt="Warning Light"></img>
        }

        return (
            <div>
                <Header />
                <div className="container moveProt">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="mt-3 mb-3 text-white">Prototype</h2>
                        </div>
                    </div>
                    <div className={ this.state.background }>

                        {startSimButton}
                        <div className={"box3 " + this.state.start}>
                            <div className="text-white timer">
                                <span id="minutes"></span>:<span id="seconds"></span>
                            </div>
                        </div>
                        {speedLimit}
                        {warningButton}
                        {!this.state.engineToggled ? (
                            <button className={"engine btn btn-danger " + this.state.start} onClick={this.toggleEngine}>Engine Off</button>
                        ) : (
                            <button className="engine btn btn-success" onClick={this.toggleEngine}>Engine On</button>
                        )}
                        <div className={this.state.start}>
                            <div className="box2">

                            </div>
                            <div className="box4">
                            </div>
                            <p className="torque">Assist Torque: Nm</p>
                            <p className="driverTorque">Driver Torque: Nm</p>
                            <p className="wheelangle">Wheel Angle: </p>
                            <p className="mode">Mode: </p>
                        </div>

                        
                        <p className={"speed " + this.state.start}>{this.state.speed} MPH</p>

                        <div className={this.state.start}>
                            <button className="reset btn btn-danger" onClick={this.resetScreen}>Reset</button>
                        </div>

                    </div>
                    <div className="expansion"></div>
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="text-white mb-3">How it works</h3>
                            <p className="text-white">
                                The simulation starts you off in a driveway. The user will need to turn the engine on first. 
                                Once the engine is on, the user will need to put the car in park. The Pedestrian Backup Assist System (PBAS) will then be enabled.
                                <br></br>
                                <br></br>
                                The system will be able to assist in the user backing up their vehicle by communicating with the on-board Object Detection Contorller (ODC). If an object is detected that would result in a collision, the system will signal to the user via. the on-board active safety system. The system will also be able to communicate with the braking system to apply brakes for the user automatically. These are all critical safety enhancements on the vehicle that will result in saving many lives, and many insurance claims. 
                                <br></br>
                                <br></br>
                                The user will be able to additionally update the vehicle by either bringing the vehicle into a certified dealership to have them provide the update via. USB or the user has the option of updating it themselves via. Over-The-Air (OTA).
                            </p>
                        </div>
                        <div className="col-md-12 mt-4">
                            <h3 className="text-white mb-3">Scenarios</h3>
                            <p className="text-white">1. The user backs vehicle up, experiencing no object detection.</p>
                            <p className="text-white">2. The user backs vehicle up, experiencing object detection, but not imminent collision.</p>
                            <p className="text-white">3. The user backs vehicle up, experiencing object detection and imminent collision.</p>
                            <p className="text-white">4. The user gets a maintenance message.</p>
                            <p className="text-white">5. The user experiences dirty rear backup camera.</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Prototype
