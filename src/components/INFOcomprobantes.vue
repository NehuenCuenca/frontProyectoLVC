<template>
    <div class="divInfo">
        <h1>Comprobantes</h1>
        <button @click="desplegarABMComprobantes('Crear')">Crear comprobante</button>

        <div class="divFiltros" v-show="!accion">
            <h4>FILTROS</h4>
            <!-- <select name="tipoDeOperacion" v-model="busqueda">
                <option value="">Todos</option>
                <option value="compra">Compras</option>
                <option value="venta">Ventas</option>
            </select> -->
            <input type="text" v-model="busqueda" placeholder="Buscar por numero comprobante">
            <br>
            <br>
            <span>Filtrar entre 2 fechas</span>
            <br>
            <input type="date" v-model="fecha1" class="inpFecha">
            <input type="date" v-model="fecha2" class="inpFecha">
            <br>
            <button @click="limpiarCampos()">Limpiar fechas</button>
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
                <tr v-for="(comprobante, index) in filtroFecha" :key="index">
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
            fecha1:"",
            fecha2:"",

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

        limpiarCampos(){
            if(this.fecha1!="" && this.fecha2!=""){
                this.busqueda=""
                this.fecha1=""
                this.fecha2=""
            } else {
                return
            }
        },

        
    },

    computed:{
        filtroNumeroComprobante(){
            return this.comprobantesCabeza.filter((elem)=> elem.codigoComprobante>=this.busqueda)
        },

        filtroFecha(){
            if(this.fecha1=="" && this.fecha2==""){
                return this.comprobantesCabeza
            }else{
                return this.comprobantesCabeza.filter((elem)=> elem.fecha>=this.fecha1 && elem.fecha<=this.fecha2)
            }
        }
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
        min-height: 50px;
        width: 50%;
        margin: 20px auto 30px auto;
        padding: 10px;
        background-color:rgb(130, 219, 247);
    }

    h4{
        margin: 5px;
    }

    .inpFecha{
        margin: 5px auto 5px auto;
    }

    span{
        font: 10px;
        font-weight: bold;
        color: rgb(58, 57, 57);
    }
</style>