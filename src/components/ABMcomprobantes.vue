<template>
    <div>
        <div class="formAgregar" v-if="accion=='Crear' || accion=='Editar'">
            <form  v-on:submit.prevent >
                <span>Codigo Comprobante</span>
                <input type="text" v-model="datosComprobantes.codigoComprobante" readonly="readonly">
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
                <div v-for="(articulo, $id) in datosComprobantes.datosPedidos" 
                        :key="$id">
                    <span>Id del Articulo {{ $id+1 }}</span>
                    <!-- <input type="text" name="datosComprobantes.datosPedidos" 
                        v-model="datosComprobantes.datosPedidos[$id].id_art"> -->
                    <select name="datosComprobantes.datosPedidos" v-model="datosComprobantes.datosPedidos[$id].id_art">
                        <option v-for="(articulo, $id_art) in articulos" 
                            :key="$id_art"
                            :value="articulo.id">
                                {{articulo.id}}| {{articulo.nombre}}
                        </option>
                    </select>             
                    <br>   
                    <br>
                    <span>Cantidad del Articulo {{ $id+1 }}</span>
                    <input type="text" name="datosComprobantes.datosPedidos"
                        v-model="datosComprobantes.datosPedidos[$id].cantidad_art">             
                    <br>
                    <br>
                    <button @click="agregarArticulo()" v-if="!$id">+</button>
                    <br>
                    <br> 
                </div>
                  
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
    created(){
        this.generarCodigoComprobante();
        this.traerArticulos();
    },

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

            articulos: [],
        }
    },

    methods: {
        guardarComprobante(){
            if(this.accion == "Crear"){
                if(this.validarCamposVacios()){
                    alert("Rellene los campos vacios o revise que los datos que esta ingresando sean COHERENTES")
                    return
                }else{
                    //console.log(JSON.stringify(this.datosComprobantes))
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

            setTimeout(() => this.$emit("MostrarABMComprobantes", false), 300)
            //this.$emit("MostrarABMComprobantes", false)
            this.$emit("traerComprobantes");
        },

        btnCancelar(){
            this.$emit("MostrarABMComprobantes", false)
        },


        agregarArticulo(){
            if(this.datosComprobantes.datosPedidos.length > 3){
                console.log(JSON.stringify(this.datosComprobantes));
                alert("NO PUEDES REGISTRAR MAS DE 4 ARTICULOS")
                return
            } else {
                let objDatosPedidos= {
                id_art:"0", 
                cantidad_art: "0",
            };
                this.datosComprobantes.datosPedidos.push(objDatosPedidos);
            }
            
        },

        generarCodigoComprobante(){
            let codigoRandom= Math.floor(Math.random() *10000000000000);
            this.datosComprobantes.codigoComprobante= codigoRandom;
        },

        traerArticulos(){
            this.traerDatosAPI("articulos")
                .then(datos => {
                    this.articulos= datos
                })
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
        height: 640px;
        width: 45%;
    }
</style>