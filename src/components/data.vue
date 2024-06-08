<template>
    <table class="table">
        <thead>
            <tr>
                <th>Location</th>
                <th>Magnitude</th>
                <th>Time</th>
            </tr>
        </thead>
        <tbody ref="info" class="info"></tbody>
    </table>
</template>

<script>
import getQuakes from '../utils/quakes';

export default {
    name: 'Data',

    mounted(){
        const quakes = getQuakes()
        quakes.pluck('properties')
        .map(this.makeRow)
        .subscribe(row => this.$refs.info.appendChild(row))
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
        }
    },
}
</script>

<style scoped>
th {
    text-align: left;
}
</style>