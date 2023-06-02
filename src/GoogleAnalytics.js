import React from 'react'
import ReactGA from "react-ga";

const GoogleAnalytics = (category="Event category") => {
 
    const eventTracker = (action = "action", label = "label") => {
        ReactGA.event({category, action, label});
      }
      return eventTracker;

}

export default GoogleAnalytics
