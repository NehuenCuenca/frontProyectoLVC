<template>
    <div class="divInfo">
        <h1>Comprobantes</h1>
        <button @click="desplegarABMComprobantes('Crear')">Crear comprobante</button>

        <div class="divFiltros" v-show="!accion">
            <h4>FILTROS</h4>
            <select name="tipoDeOperacion" v-model="busqueda">
                <option value="">Todos</option>
                <option value="compra">Compras</option>
                <option value="venta">Ventas</option>
            </select>
        </div>

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
                <tr v-for="(comprobante, index) in filtroNumeroComprobante" :key="index">
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
            busqueda: "",

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
            this.accion="";
        },

        
    },

    computed:{
        filtroNumeroComprobante(){
            return this.comprobantesCabeza.filter((elem)=>elem.tipoOperacion.includes(this.busqueda))
        },
    },

}
</script>

<style scoped>
    .divInfo{
        min-height: 400px;
        border-style: double;
        width: 60%;
        margin:20px auto 20px auto;
        background-color: rgb(176, 214, 221);
    }

    table, th, td{
        border: 2px solid rgb(116, 113, 113);
        border-collapse: collapse;
        margin:20px auto 20px auto;
        background-color: rgb(255, 255, 255);
    }

    .divFiltros{
        border: 2px black solid;
        border-radius: 10px;
        min-height: 60px;
        width: 600px;
        margin: 10px auto 10px auto;
        padding: 10px;
        background-color:rgb(130, 219, 247);
    }

    h4{
        margin: 5px;
    }
</style>