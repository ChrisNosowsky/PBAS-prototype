import React, { Component } from 'react'
import warning from '../assets/Prototype/pslight.png'
import Header from './Header';
import Footer from './Footer';

// TODO: Add override message to brake when system messages say "Automatic braking system: on"
// TODO: Add JS braking mechanism for pressing B
// TODO: Add automatic braking mechanism to brake on override
// TODO: Stop vehicle and frames and dont update messages to automatic braking if user presses "B" in time.
// TODO: Add in flashing HUD
// TODO: Add in warning triangle
// TODO: Add in auditory chimes
// TODO: Add in active safety on/off messages

const options = [
    {
        label: "Scenario 1: The user backs vehicle up, experiencing no object detection",
        value: "scenario1",
    },
    {
        label: "Scenario 2/3: The user backs vehicle up, experiencing object detection",
        value: "scenario2",
    },
    {
        label: "Scenario 4: The user gets a maintenance message",
        value: "scenario4",
    },
    {
        label: "Scenario 5: The user experiences dirty rear backup camera",
        value: "scenario5",
    }
];

export class Prototype extends Component {

    
    constructor(props) {
        super(props);
        this.state = {timer: null, speed: 0,
            background: "scenarioStart",
            engineToggled: false, reverse: false, maintenance: false, washed: false, objectDetected: false,
            resetScenario: "scenarioStart",
            scenario: "scenarioStart",
            scenarioMessage: "The user backs vehicle up, experiencing no object detection",
            timeoutId: 0,
            intervalId: 0,
            activeSafety: false,
            automaticBraking: false,
            backupComplete: false,
            imminentCollision: false,
            countdownTimer: 3,      
            hidden: "hidden", start: "hidden", warning: false};
        this.resetScreen = this.resetScreen.bind(this);
        this.toggleEngine = this.toggleEngine.bind(this);
        this.startSimulation = this.startSimulation.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.mainMenu = this.mainMenu.bind(this)
        this.setReverse = this.setReverse.bind(this)
        this.setSpeed = this.setSpeed.bind(this)
        this.washCamera = this.washCamera.bind(this)
        this.updateSoftware = this.updateSoftware.bind(this)
        this.startBackup = this.startBackup.bind(this)
        this.slowSpeed = this.slowSpeed.bind(this)
        this.countDown = this.countDown.bind(this)
    }

    resetScreen() {
        alert("Simulation has reset.")
        clearInterval ( this.state.timer );
        clearTimeout(this.state.timeoutId)
        clearInterval(this.state.intervalId)
        this.startTimer()
        this.setState({speed: 0,
            engineToggled: false, 
            background: "scenarioBegin",
            scenario: this.state.resetScenario,
            maintenance: false,
            reverse: false,
            washed: false, 
            timeoutId: 0,
            intervalId: 0,
            activeSafety: false,
            backupComplete: false,
            automaticBraking: false,
            imminentCollision: false,
            countdownTimer: 3,
            hidden: "hidden", start: "", warning: false})
        if (this.state.resetScenario === "scenario4") {
            this.setState({maintenance: true})
        }
    }

    washCamera() {
        this.setState({background: "scenarioWash", washed: true})
        const timeoutId = setTimeout(() => {
            this.setState({background: "scenario1backup1", scenario: "scenario1"})
        }, 2000);
        this.setState({timeoutId})
    }

    startSimulation() {
        if (this.state.scenario === "scenarioStart") {
            this.setState({scenario: "scenario1", resetScenario: "scenario1"})
        }

        if (this.state.scenario === "scenario4") {
            this.setState({maintenance: true})
        }

        this.setState({background: "scenarioBegin", start: ""})
        this.startTimer()
    }

    mainMenu() {
        clearInterval ( this.state.timer );
        this.setState({timer: null, speed: 0,
            background: "scenarioStart",
            scenario: "scenarioStart",
            resetScenario: "scenarioStart",
            scenarioMessage: "The user backs vehicle up, experiencing no object detection",
            timeoutId: 0,
            intervalId: 0,
            backupComplete: false,
            imminentCollision: false,
            automaticBraking: false,
            countdownTimer: 3,
            engineToggled: false, reverse: false, maintenance: false, 
            washed: false, objectDetected: false, activeSafety: false,
            hidden: "hidden", start: "hidden", warning: false});
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


    toggleEngine() {
        if(this.state.engineToggled) {
            clearInterval(this.state.intervalId)
            this.setState({speed: 0,
                engineToggled: false, reverse: false, hidden: "hidden", warning: false })

            if (this.state.backupComplete) {
                this.setState({background: "scenariobackupComplete"})
            } else {
                this.setState({background: "scenarioBegin"})
            }
        } else {
            this.setState({engineToggled: true, hidden: ""})
        }

        if(!this.state.engineToggled && this.state.scenario === "scenario4") {
            this.setState({engineToggled: true, hidden: "", background: "scenario4", reverse: true, warning: true})
        }
    }

    handleChange(e) {
        let selectedOptionText = e.target.options[e.target.selectedIndex].text.slice(12)
        this.setState( {resetScenario: e.target.value, scenario: e.target.value, scenarioMessage: selectedOptionText} );
    }

    setReverse() {
        let frame = 1;

        if(this.state.backupComplete) {
            frame = 5;
        }

        if (this.state.scenario === "scenario1") {
            this.setState( {reverse: true, background: this.state.scenario + "backup" + frame.toString()} )
        } else if (this.state.scenario === "scenario2") {
            this.setState( {reverse: true, background: this.state.scenario + "object" + frame.toString(), objectDetected: true} )
        } else {
            this.setState( {reverse: true, background: this.state.scenario} )
        }
        
    }

    setSpeed() {
        var time = 1;
        var intervalId = setInterval(() => { 
            if (time <= 5) {
                this.setState({speed: time/10})
                time++;
            }
            else { 
                this.startBackup()
                clearInterval(intervalId);
            }
         }, 300);
         this.setState({intervalId})
    }

    slowSpeed() {
        var time = 5;
        var intervalId = setInterval(() => { 
            if (time >= 0) {
                this.setState({speed: time/10})
                time--;
            }
            else { 
                clearInterval(intervalId);
                alert("Scenario Complete.")
            }
         }, 300);
         this.setState({intervalId})
    }

    updateSoftware() {
        this.setState({background: "scenarioUpdating"})
        const timeoutId = setTimeout(() => {
            this.setState({background: "scenarioUpdated", warning: false, maintenance: false})
            const timeoutId2 = setTimeout(() => {
                this.setState({background: "scenario1backup1", scenario: "scenario1"})
            }, 2000);
            this.setState({timeoutId: timeoutId2})
        }, 2000);
        this.setState({timeoutId})
    }

    startBackup() {
        var time = 2;
        this.countDown()
        var intervalId = setInterval(() => { 
            if (time <= 5) {
                if(this.state.scenario === "scenario1") {
                    this.setState({background: this.state.scenario + "backup" + time.toString()})
                } else if (this.state.scenario === "scenario2") {
                    if (time === 3 && this.state.objectDetected) {
                        this.setState({activeSafety: true, imminentCollision: true, automaticBraking: true})
                    }
                    this.setState({background: this.state.scenario + "object" + time.toString()})
                }
                
                time++;
            }
            else { 
                this.slowSpeed()
                this.setState({backupComplete: true})
                clearInterval(intervalId);
            }
        }, 2000);
        this.setState({intervalId})
    }

    countDown() {
        var time = 3;
        var intervalId = setInterval(() => { 
            if (time >= 1) {
                this.setState({countdownTimer: time})
                time--;
            }
            else { 
                clearInterval(intervalId);
            }
        }, 1000);
    }

    render() {
        let startSimButton;
        let warningButton;
        let odc;

        if (this.state.engineToggled && this.state.reverse && this.state.objectDetected && this.state.imminentCollision) {
            odc = <p className="odc">Object Detection Controller: IMMINENT OBJECT</p>
        } else if (this.state.engineToggled && this.state.reverse && this.state.objectDetected && !this.state.imminentCollision) {
            odc = <p className="odc">Object Detection Controller: NEARBY OBJECT</p>
        } else {
            odc = <p className="odc">Object Detection Controller: NO OBJECT</p>
        }

        if (this.state.start) {
            startSimButton = 
            <div>
                <p className="start-text">Pedestrian Backup Assist System Prototype</p>
                <button className={"simstart btn btn-success"} onClick={this.startSimulation}>Start Simulation</button>
                <p className="scenario-text">Choose a Scenario</p>
                <select value={this.state.scenario} onChange={this.handleChange} className="scenario-select form-select form-select-lg">
                    {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
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
                    <div className={"defaultBackground " + this.state.background }>

                        {startSimButton}
                        <div className={"box3 " + this.state.start}>
                            <div className="text-white timer">
                                <span id="minutes"></span>:<span id="seconds"></span>
                            </div>
                        </div>
                        {warningButton}

                        {!this.state.engineToggled ? (
                            <button className={"engine btn btn-danger " + this.state.start} onClick={this.toggleEngine}>Engine Off</button>
                        ) : (
                            <button className="engine btn btn-success" onClick={this.toggleEngine}>Engine On</button>
                        )}

                        {
                        (this.state.engineToggled && !this.state.reverse) && 
                            <button className={"reverse btn btn-danger " + this.state.start} onClick={this.setReverse}>Reverse</button>
                        }

                        {
                        ((this.state.scenario === "scenario1" || this.state.scenario === "scenario2") 
                        && this.state.engineToggled && this.state.reverse && this.state.speed < 0.5 && !this.state.backupComplete) && 
                            <button className={"gas btn btn-success " + this.state.start} onClick={this.setSpeed}>Gas</button>
                        }

                        {
                        (this.state.engineToggled && this.state.reverse && (this.state.scenario === "scenario5" && !this.state.washed)) && 
                        <button className={"washer btn btn-danger " + this.state.start} onClick={this.washCamera}>Wash Rear Camera</button>
                        }

                        {
                        (this.state.engineToggled && this.state.scenario === "scenario4" && this.state.maintenance) && 
                            <button className="update btn btn-danger" onClick={this.updateSoftware}>Update</button>
                        }

                        {
                        (this.state.speed >= 0.5 && this.state.objectDetected) && 
                            <div className="box5">
                                <p className="warningCollisionWarning">WARNING</p>
                                <p className="warningCollision">IMMINENT COLLISION AHEAD. PRESS "B" TO BRAKE</p>
                                <p className="warningCollision2">{this.state.countdownTimer}</p>
                            </div>
                        }
                        


                        <div className={this.state.start}>
                            <div className="box4">
                            </div>
                            <p className="scenario">Scenario: {this.state.scenarioMessage}</p>
                            
                            {this.state.imminentCollision ? (
                                <p className="activeSafety">Active Safety System: Active</p>
                            ) : (
                                <p className="activeSafety">Active Safety System: Inactive</p>
                            )}

                            {odc}

                            {this.state.automaticBraking ? (
                                <p className="automaticBraking">Automatic Braking System: On</p>
                            ) : (
                                <p className="automaticBraking">Automatic Braking System: Off</p>
                            )}
                            
                            {this.state.maintenance ? (
                                <p className="csm">Center Stack Module State: Service Needed</p>
                            ) : (
                                <p className="csm">Center Stack Module State: Functional</p>
                            )}
                            
                        </div>


                        {
                        (this.state.engineToggled) && 
                            <p className={"speed " + this.state.start}>{this.state.speed} MPH</p>
                        }
                        

                        <div className={this.state.start}>
                            <button className="mainMenu btn btn-danger" onClick={this.mainMenu}>Change Scenario</button>
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
