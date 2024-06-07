import Rx from "rx-dom";


function getEarthquakes(){
    return Rx.Observable.interval(1000)
}

export default getEarthquakes