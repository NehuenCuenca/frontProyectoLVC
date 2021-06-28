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
                <input type="text" name="datosComprobantes.datosPedidos" 
                    v-model="datosComprobantes.datosPedidos[0].id_art" >             
                <br>   
                <br>
                <span>Cantidad Articulo 1</span>
                <input type="text" name="datosComprobantes.datosPedidos" 
                    v-model="datosComprobantes.datosPedidos[0].cantidad_art">             
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
                fecha: "",
                tipoOperacion: {
                    1: "compra",
                    2: "venta",
                },
                datosPedidos:[
                    {  
                        id_art:"0", 
                        cantidad_art: "0",
                    },
                ],
            }, 
        }
    },

    methods: {
        guardarComprobante(){
            if(this.accion == "Crear"){
                if(this.validarCamposVacios()){
                    alert("Rellene los campos vacios o revise que los datos que esta ingresando sean COHERENTES")
                    return
                }else{
                 this.enviarDatosAPI("comprobantes-cabeza", this.datosComprobantes)
                    .then(datos => {
                        this.datosComprobantes = datos
                    })  
                } 
            } else if(this.accion == "Editar"){
                if(this.validarCamposVacios()){
                    alert("Rellene los campos vacios o revise que los datos que esta ingresando sean COHERENTES")
                    return
                }else{
                //this.editarDatos("comprobantes-cabeza", this.datosComprobantes, this.id)
                console.log("Editar datos...")
                }
            }

            this.$emit("MostrarABMComprobantes", false)
            this.$emit("traerComprobantes");
        },

        btnCancelar(){
            this.$emit("MostrarABMComprobantes", false)
        },

        validarCamposVacios(){
            let codComproobante= this.datosComprobantes.codigoComprobante
            let tipoDeOperacion= this.datosComprobantes.tipoOperacion
            let fecha= this.datosComprobantes.fecha
            let id_articulo= this.datosComprobantes.datosPedidos.id_art
            let cantidad_articulo= this.datosComprobantes.datosPedidos.cantidad_art

            if(codComproobante < 1 || codComproobante.length > 20 || tipoDeOperacion === ""
                || fecha === "" || id_articulo < 1 || cantidad_articulo < 1){
                return true
            }
            else{
                return false
            }

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