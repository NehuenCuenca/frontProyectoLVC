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
                    <span>Articulo {{ $id+1 }}</span>
                    <select name="datosComprobantes.datosPedidos" v-model="datosComprobantes.datosPedidos[$id].id_art">
                        <option v-for="(articulo, $id_art) in articulos" 
                            :key="$id_art"
                            :value="articulo.id">
                                {{articulo.id}} | {{articulo.nombre}}
                        </option>
                    </select>             
                    <br>   
                    <br>
                    <span>Cantidad Articulo {{ $id+1 }}</span>
                    <input type="number" name="datosComprobantes.datosPedidos"
                        v-model="datosComprobantes.datosPedidos[$id].cantidad_art" min="20" max="80">   
                        <br>
                    <br>           
                    <button @click="agregarArticulo()" v-if="!$id">+</button>
                    <br>
                    <br> 
                </div>
                <hr>
                <div class="divBtns">
                    <button @click="btnCancelar()">Cancelar</button> | 
                    <input type="submit" value="Guardar Comprobante" 
                        @click="guardarComprobante()">
                </div>
                
            </form>

           
        </div>

        <div v-if="(accion=='Consultar') || (accion=='Borrar')">
            <div class="marco">
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Codigo Comprobante</th>
                        <th>Fecha realizado</th>
                        <th>Operacion</th>
                        <th>Articulo</th>
                        <th>Cantidad</th>
                    </thead>
                    <tbody>
                        <tr v-for="(renglon, indice) in comprobantesRenglon" :key="indice">
                            <td>{{renglon.id}}</td>
                            <td>{{renglon.codigoComprobante}}</td>
                            <td>{{renglon.fecha}}</td>
                            <td>{{renglon.tipoOperacion}}</td>
                            <td>{{renglon.nombre_articulo}}</td>
                            <td>{{renglon.cantidad}}</td>
                        </tr>
                    </tbody>
                </table>
                
                <button v-if="accion=='Consultar'" @click="btnCancelar()">Cerrar</button>

                <div class="divBorrar" v-if="accion == 'Borrar'">
                    <p class="pBorrar">¿Esta seguro de BORRAR este COMPROBANTE?</p>
                    <div class="divBtns"> 
                        <button @click="btnCancelar()">No, volver</button> |
                        <button @click="guardarComprobante()">Si, borrar comprobante</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import traerAPI from "../mixins/traerAPI.vue";

export default {
    mixins:[traerAPI],

    props:['accion', 'id'],

    created(){
         if(this.accion == "Crear"){
            this.traerArticulos();
            this.generarCodigoComprobante();
        } else if(this.accion == "Consultar" || this.accion=="Borrar") {
            this.traerComprobantesRenglon();
        } else {
            console.log("Borrando articulos")
        } 

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
            comprobantesRenglon:[],
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
            } else if(this.accion == "Borrar"){
                console.log(this.id)
                this.borrarDatos('comprobantes-cabeza', this.id)
            }

            setTimeout(() => this.$emit("MostrarABMComprobantes", false), 300)
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

        traerComprobantesRenglon(){
            console.log("Obteniendo COMPROBANTES-Renglones desde la API...");
            this.traerDatosPorId('comprobantes-cabeza', this.id)
                .then(datos => {
                    this.comprobantesRenglon = datos
                })
        },  

        validarCamposVacios(){
            let codComproobante= this.datosComprobantes.codigoComprobante
            let tipoDeOperacion= this.datosComprobantes.tipoOperacion
            let fecha= this.datosComprobantes.fecha
            let id_articulo= this.datosComprobantes.datosPedidos.id_art
            let cantidad_articulo= this.datosComprobantes.datosPedidos.cantidad_art

            if(codComproobante < 1 || codComproobante.length > 20 || 
                tipoDeOperacion === "" || fecha === "" || 
                id_articulo < 1 || cantidad_articulo < 1){
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
        margin-left: 27%;
        border: 2px solid black;
        border-radius: 5%;
        background-color: rgb(175, 228, 238);
        margin-bottom: 30px;
        min-height: 40%;
        width: 45%;
    }

    .marco{
        margin-top: 10px;
        margin-left: 15%;
        padding: 10px;
        border: 2px solid black;
        border-radius: 5%;
        min-height: 100px;
        width: 70%;
        background-color: rgb(126, 208, 233)
    }
    
    table, th, td{
        border: 2px solid rgb(116, 113, 113);
        border-collapse: collapse;
        margin-top: 2%;
        margin-left: 2%;
        margin-bottom: 30px;
        background-color: rgb(255, 255, 255);
    }

    .divBorrar{
        height: 80px;
        width: 70%;
        border: 2px solid black;
        border-radius: 5%;
        background-color: rgb(241, 95, 115);
        margin-left: 15%;
    }

    .pBorrar{
        font: 20px;
        font-weight: bold;
        color: black;
    }

    .divBtns{
        margin-top: 20px;
        margin-bottom: 10px;
    }
</style>