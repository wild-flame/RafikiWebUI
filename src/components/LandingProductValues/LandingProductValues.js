import React from 'react';

import './Overview.css';
import dataColabOp from "../../assets/dataColabOp.png"
import gitflowForData from "../../assets/gitflowForData.png"
import dataProcessing from "../../assets/dataProcessing.png"


function LandingProductValues(props) {
  return (
    <div>
      <div className="section_copy">
        <div className="conversation__description">
          <div className="description__heading">
            Data collaborative<br/>operation
          </div>
          <p className="description__text">
ForkBase supports <b>collaboration-oriented</b> data management with systematic coordination for scaling.
It facilitates data forking, data version management and access control to the
end of multi-tenant analytics.
          </p>
        </div>
        <div className="img-container">
          <img src={dataColabOp} alt="dataColabOp" className="landing-img" />
        </div>
      </div>

      <div className="section_copy">
        <div className="conversation__description">
          <div className="description__heading">
            Gitflow for data
          </div>
          <p className="description__text">
ForkBase provides <b>Git-like</b> operations, but focuses on data, its security, immutability
and provenance. Data in ForkBase is multi-versioned, and
each version uniquely identifies the data content and its history.
          </p>
        </div>
        <div className="img-container">
          <img src={gitflowForData} alt="gitflowForData" className="landing-img" />
        </div>
      </div>

      <div className="section_copy">
        <div className="conversation__description">
          <div className="description__heading">
            Collaborative data <br />processing
          </div>
          <p className="description__text">
Collaborative data processing typically involves <b>multiple parties</b> to 
deal with the <b>same data source</b>. With ForkBase, a job proposer can outsources 
data processing to different vendors and eventually integrates the outcomes with ease.
          </p>
        </div>
        <div className="img-container">
          <img
            src={dataProcessing}
            alt="dataProcessing"
            className="landing-img"
          />
        </div>
      </div>

    </div>
  );
}

export default LandingProductValues
