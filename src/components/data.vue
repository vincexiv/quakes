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

export default {
    name: 'Data',

    props: { quakes: Object },

    mounted(){
        this.quakes.pluck('properties')
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