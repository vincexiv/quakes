import Rx from "rx-dom";
import { QUAKE_URL } from "./config";
import { jsonp } from 'vue-jsonp'


function getQuakes(){
    return Rx.Observable.create(function(observer){
        setInterval(()=>{
            fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson').then(res => {
                if(res.ok){
                    res.json().then(data => {
                        observer.onNext(data.features)
                    })
                } else {
                    observer.onNext(Rx.Observable.return({type: 'error', details: err}))
                }
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

export default getQuakes