<template>
    <div id="tweets" class="data noselect">
        <h3>Tweets</h3>
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

export default {
    name: 'Tweets',

    props: {
        socket: Object
    },

    mounted(){
        this.socket.subscribe(this.handleWebSocketMessages)
    },

    methods: {
        handleWebSocketMessages: function(quakeData){
            console.log(quakeData)
        }
    }
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