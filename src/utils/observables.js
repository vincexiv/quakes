import Rx from "rx-dom";
import { QUAKE_URL } from "./config";

function getQuakes(){
    return Rx.Observable.create(function(observer){
        setInterval(()=>{
            fetch(QUAKE_URL).then(res => {
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
    })
    .distinct(function(val){ return val.id })
    .share()
}

function isHovering(element){
    const identity = Rx.helpers.identity
    const over = Rx.DOM.mouseover(element).map(identity(true))
    const out = Rx.DOM.mouseout(element).map(identity(false))

    return over.merge(out)
}

function isClicked(element){
    return Rx.DOM.click(element)
}

export { getQuakes, isHovering, isClicked }