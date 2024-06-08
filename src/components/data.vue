<template>
    <div class="data">
        <table style="cellspacing: 0;" >
            <thead>
                <tr>
                    <th>Location</th>
                    <th>Magnitude</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody ref="info" class="info"></tbody>
        </table>
    </div>
</template>

<script>
import { isClicked, isHovering } from '../utils/observables'

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
            const fragment = document.createDocumentFragment()
            rows.forEach(row => {
                fragment.appendChild(row)
                isHovering(row).subscribe(state => {
                    this.rowHover({row, state})
                })
                isClicked(row).subscribe(() => {
                    this.rowClick(row)
                });
            })
            this.$refs.info.appendChild(fragment)
        })
    },

    methods: {
        makeRow: function(props) {
            if(props.type !== 'error'){
                const row = document.createElement('tr');
                row.id = props.net + props.code;
                const date = new Date(props.time);
                const time = date.toString();
    
                [props.place, props.mag, time].forEach(function(text) {
                    const  cell = document.createElement('td');
                    cell.textContent = text;
                    row.appendChild(cell);
                });
    
                return row;
            }
        },
    },
}
</script>

<style scoped>
th, td {
    text-align: left;
    min-width: 30%;
    padding: 0.3rem;
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
}

table {
    font-size: x-small;
    border-collapse: separate;
    border-spacing: 0 10px;
}

.data {
  position: absolute;
  width: 100%;
  height: 100%;
  width: calc(400px - 1rem);
  height: calc(100vh - 3rem);
  padding: 0.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>