import Rx from "rx-dom";
import { QUAKE_URL } from "./config";
import { jsonp } from 'vue-jsonp'


function getEarthquakes(){
    return Rx.Observable.create(function(observer){
        window.eqfeed_callback = function () { }
        setInterval(()=>{
            jsonp(QUAKE_URL, { callbackName: 'eqfeed_callback'}).then(response => {
                observer.onNext(response.features)
            }).catch(err => {
                observer.onNext(Rx.Observable.return({type: 'error', details: err}))
            })
        }, 5000)
    })
    .flatMap(function(array){
        return Rx.Observable.create(function(observer){
            (array || []).forEach(val => {
                observer.onNext(val)
            })
        })
    }).distinct(function(val){ return val.id })
}

export default getEarthquakes