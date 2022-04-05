import React, { Component } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export class Bib extends Component {
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
                            <h4>Bibliography</h4>
                        </div>
                        <div className="row mt-4">
                            <p>
                                [1] D. Thakore and S. Biswas, “Routing with Persistent Link Modeling in Intermittently Connected Wireless Networks,” Proceedings of IEEE Military Communication, Atlantic City, October 2005. 
                            </p>
                            <p>
                                [2]	“Federal Motor Vehicle Safety Standard, Rearview Mirrors; Federal Motor Vehicle Safety Standard, Low-Speed Vehicles Phase-in Reporting Requirements,” DEPARTMENT OF TRANSPORTATION, National Highway Traffic Safety Administration, 49 CFR Parts 571 and 585, Docket No. NHTSA-2010-0162 RIN 2127-AK43, http://www.cse.msu.edu/~cse870/Homework/References/Rear_Visibility_NPRM_12032010-NHTSA.pdf
                            </p>
                            <p>
                                [3]	Heckman, Genevieve M., et al. “Drivers’ Visual Behavior During Backing Tasks: Factors Affecting the Use of Rearview Camera Displays.” Proceedings of the Human Factors and Ergonomics Society Annual Meeting, vol. 56, no. 1, Sept. 2012, pp. 2236–2240, doi:10.1177/1071181312561471. 
                            </p>
                            <p>
                                [4]	Jessica B. Cicchino, “Real-world effects of rear automatic braking and other backing assistance systems,” Journal of Safety Research, Volume 68, 2019, Pages 41-47, ISSN 0022-4375, https://doi.org/10.1016/j.jsr.2018.12.005 (https://www.sciencedirect.com/science/article/pii/S0022437518303451)
                            </p>
                            <p>
                                [5]	Kazunori Kikuchi, Hiroshi Hashimoto, Takashi Hosokawa, Katsumi Nawata, Akinari Hirao, “Relationship between pedestrian detection specifications of parking sensor and potential safety benefits,” Accident Analysis & Prevention, Volume 151, 2021, 105951, ISSN 0001-4575, https://doi.org/10.1016/j.aap.2020.105951 (https://www.sciencedirect.com/science/article/pii/S0001457520317711)
                            </p>
                        </div>
                    </div>
                </div>
                
                <Footer />
            </div>
        )
    }
}

export default Bib
