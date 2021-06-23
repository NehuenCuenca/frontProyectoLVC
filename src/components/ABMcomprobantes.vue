<template>
    <div>
        <div class="formAgregar" v-if="accion=='Crear' || accion=='Editar'">
            <form  v-on:submit.prevent >
                <span>Codigo Comprobante</span>
                <input type="text" v-model="datosComprobantes.codigoComprobante">
                <br>
                <br>
                <span>Tipo Operacion </span>
                <select name="tipoDeOperacion" 
                    v-model="datosComprobantes.tipoOperacion">
                    <option value="1">Compra</option>
                    <option value="2">Venta</option>
                </select>
                <br>    
                <br>
                <span>Fecha de realizado</span>
                <input type="date" v-model="datosComprobantes.fecha" >
                <br>
                <br>
                <span>Id Articulo 1</span>
                <input type="text" name="datosComprobantes.articulosPedidos " 
                    v-model="datosComprobantes.articulosPedidos[0].id" >             
                <br>   
                <br>
                <span>Cantidad Articulo 1</span>
                <input type="text" name="datosComprobantes.articulosPedidos" 
                    v-model="datosComprobantes.articulosPedidos[0].cantidad" >             
                <br>   
                <br>
                <button @click="btnCancelar()">Cancelar</button>
                <input type="submit" value="Guardar Comprobante" 
                    @click="guardarComprobante()">
            </form>
        </div>
    </div>
</template>

<script>
import traerAPI from "../mixins/traerAPI.vue";

export default {
    mixins:[traerAPI],

    props:['accion', 'id'],

    data(){
        return {
            datosComprobantes:{
                codigoComprobante: "",
                tipoOperacion: {
                    1: "compra",
                    2: "venta",
                },
                fecha: "",
                articulosPedidos:[
                    {  
                        id:"0", 
                        cantidad: "0",
                    },
                ],
            }, 
        }
    },

    methods: {
        guardarComprobante(){
            if(this.accion == "Crear"){
                console.log(this.datosComprobantes); 
                /* this.enviarDatosAPI("comprobantes-cabeza", this.datosComprobantes)
                    .then(datos => {
                        this.datosComprobantes = datos
                    })  */    
            } else if(this.accion == "Editar"){
                //this.editarDatos("comprobantes-cabeza", this.datosComprobantes, this.id)
                console.log("Editar datos...")
            }

            this.$emit("MostrarABMComprobantes", false)
            this.$emit("traerComprobantes");
        },

        btnCancelar(){
            this.$emit("MostrarABMComprobantes", false)
        },

        



    },
}
    
</script>

<style scoped>
    .formAgregar{
        padding: 10px;
        margin-top: 20px;
        text-align: center;
        margin-left: 30%;
        border: 2px solid black;
        border-radius: 5%;
        background-color: rgb(223, 226, 193);
        margin-bottom: 30px;
        height: 240px;
        width: 45%;
    }
</style>