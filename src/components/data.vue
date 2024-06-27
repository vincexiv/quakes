<template>
    <div class="data">
        <h3>Earthquakes</h3>
        <table ref="table" style="cellspacing: 0;" >
            <thead>
                <tr>
                    <th>Location</th>
                    <th>Magnitude</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody ref="info" class="info">
                <div ref="spinner" class="spinner-container">
                    <div class="spinner"></div>
                </div>
            </tbody>
        </table>
    </div>
</template>

<script>
import Rx from 'rx'

export default {
    name: 'Data',

    props: { 
        quakes: Object,
        rowHover: Function,
        rowClick: Function
     },

    mounted(){
        this.quakes.pluck('properties')
        .map(this.makeRow)
        .bufferWithTime(500)
        .filter(rows => rows.length > 0)
        .subscribe(rows => {
            this.$refs.spinner.style.display = 'none'

            const fragment = document.createDocumentFragment()
            rows.forEach(row => { fragment.appendChild(row) })
            this.$refs.info.appendChild(fragment)
        })

        this.getRowFromEvent('mouseover')
        .pairwise()
        .subscribe((rows) => {
            const prevRow = rows[0]
            const currRow = rows[1]
            this.rowHover([
                {row: prevRow, color: '#0000ff'},
                {row: currRow, color: '#ff0000'}
            ])
        })

        this.filterMouseDown(this.getRowFromEvent('click'))
        .subscribe(row => {
            this.rowClick(row)
        })
    },

    methods: {
        makeRow: function(props) {
            if(props.type !== 'error'){
                const row = document.createElement('tr');
                row.id = props.net + props.code;

                row.style.display = 'flex'
                row.style.gap = '1rem'

                const date = new Date(props.time);
    
                const items = {
                    place: props.place,
                    mag: props.mag.toFixed(2),
                    time: date.toString()
                }

                for(const itemName in items){
                    const  cell = document.createElement('td');
                    cell.textContent = items[itemName];
                    cell.style.width = '130px'

                    if(itemName == 'place'){
                    } else if(itemName === 'mag'){
                        cell.style.textAlign = 'center'
                    } else {
                        cell.style.textAlign = 'left'
                    }

                    row.style.cursor = 'pointer'
                    row.appendChild(cell);
                }
                return row;
            }
        },
        filterMouseDown: function(observable){ // Filter out events where mouse is down
            const mousedown = Rx.Observable.fromEvent(this.$refs.table, 'mousedown')
                .startWith(null)
                .map(event => {
                    return event
                })

            const mouseup = Rx.Observable.fromEvent(this.$refs.table, 'mouseup')
                .startWith(null)

            return Rx.Observable.combineLatest(
                observable, mousedown, mouseup,
                function(observable, mousedown, mouseup){
                    return { observable, mousedown, mouseup }
                }
            )
            .filter(events => {
                return events.mouseup?.timeStamp > events.mousedown?.timeStamp
            })
            .map(events => {
                return events.observable
            })
        },
        getRowFromEvent: function(eventName){
            return Rx.Observable.fromEvent(this.$refs.table, eventName)
            .filter(event => {
                const el = event.target
                return el.nodeName === 'TD' && el.parentNode.id
            })
            .pluck('target', 'parentNode')
            .distinctUntilChanged()
        }
    },
}
</script>

<style scoped>
h3 {
    color: rgba(0, 0, 0, 0.7);
}

th, td {
    min-width: 30%;
    padding: 0 0.5rem;
    cursor: pointer;
}

tr {
    cursor: pointer;
}

thead {
    position: sticky;
    top: 0;
    background-color: skyblue;
    border-radius: 5px;
    width: 100%;
    padding: 0.5rem;
}

.spinner-container {
    height: 100%;
    display: flex;
}

.spinner {
    margin: auto;
}

table {
    font-size: x-small;
    border-collapse: separate;
    border-spacing: 0 10px;
    height: calc(100% - 2rem);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.data {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: calc(100vh - 3rem);
    padding: 0.5rem;
    gap: 1rem;
}

thead tr {
    display: flex;
    justify-content: space-around;
}

tbody {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>