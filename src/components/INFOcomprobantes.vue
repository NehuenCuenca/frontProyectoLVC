<template>
    <div class="divInfo">
        <h1>Comprobantes</h1>
        <button @click="desplegarABMComprobantes('Crear')">Crear comprobante</button>
        <ABMcomprobantes
            v-if="abrirABMcomprobante == true"
            :accion=accion
            :id=id
            @MostrarABMComprobantes="MostrarABMComprobantes($event)"
        />

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Codigo comprobante</th>
                    <th>Compra/Venta</th>
                    <th>Fecha realizada</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(comprobante, index) in comprobantesCabeza" :key="index">
                    <td>{{comprobante.id}}</td>
                    <td>{{comprobante.codigoComprobante}}</td>
                    <td>{{comprobante.tipoOperacion}}</td>
                    <td>{{comprobante.fecha}}</td>
                    <td>
                        <button @click="desplegarABMComprobantes('Borrar', comprobante.id)">Borrar</button>
                        <br>
                        <button @click="desplegarABMComprobantes('Consultar', comprobante.id)">Consultar</button>
                    </td>
                </tr>
            </tbody>
        </table>

        
    </div>
</template>

<script>
import ABMcomprobantes from "../components/ABMcomprobantes.vue";
import traerAPI from "../mixins/traerAPI.vue";

export default {
    mixins:[traerAPI],

    data(){
        return {
            abrirABMcomprobante: false,
            comprobantesCabeza: [],
            accion: "",
            id: 0,

        }
    },

    created(){
      this.traerComprobantesCabeza(); 
    },

    components: {
        ABMcomprobantes,
    },

    methods: {
        desplegarABMComprobantes(accion, id=0){
            this.accion= accion;
            this.id = id;
            this.abrirABMcomprobante= !this.abrirABMcomprobante;             
        },

        traerComprobantesCabeza(){
            console.log("Obteniendo COMPROBANTES-CABEZA desde la API...");
            this.traerDatosAPI("comprobantes-cabeza")
                .then(datos => {
                    this.comprobantesCabeza = datos
                })
        },

        MostrarABMComprobantes(ver){
            this.abrirABMcomprobante = ver
            this.traerComprobantesCabeza();
        },

        
    },

}
</script>

<style scoped>
    .divInfo{
        margin-top: 2%;   
        border-style: double;
        width: 60%;
        margin-left: 20%;
        background-color: rgb(176, 214, 221);
        margin-bottom: 25px;
    }

    table, th, td{
        border: 2px solid rgb(116, 113, 113);
        border-collapse: collapse;
        margin-top: 2%;
        margin-left: 19%;
        margin-bottom: 30px;
        background-color: rgb(255, 255, 255);
    }
</style>