<template>
    <div>
        <div class="formAgregar" v-if="(accion == 'Crear') || (accion =='Editar')">
            <h3>{{ accion }} articulo</h3>
            <form @submit.prevent>
                <span>Nombre</span>
                <input type="text" v-model="datosArticulos.nombre">
                <br>
                <span>Precio</span>
                <input type="text" v-model="datosArticulos.precio">
                <br>
                <span>Fecha Vencimiento</span>
                <input type="date" v-model="datosArticulos.fechaVencimiento">
                <br>
                <span>Stock min</span>
                <input type="text" v-model="datosArticulos.stockMinimo">
                <br>
                <span>Stock max</span>
                <input type="text" v-model="datosArticulos.stockMaximo">
                <br>
                <span>Rubro_id</span>
                <input type="text" v-model="datosArticulos.rubro_id">
                <br>
                <button @click="btnCancelar()">Cancelar</button>
                <button @click="guardarArticulo()">Enviar</button>
            </form>
        </div>
        
        <div v-if="(accion == 'Borrar') || (accion =='Consultar')" class="marco">
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre_articulo</th>
                            <th>FechaVencimiento</th>
                            <th>Rubro_id</th>
                            <th>Precio</th>
                            <th>S_Minimo</th>
                            <th>S_Maximo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ datosArticulos.id }}</td>
                            <td>{{ datosArticulos.nombre }}</td>
                            <td>{{ datosArticulos.fechaVencimiento }}</td>
                            <td>{{ datosArticulos.rubro_id }}</td>
                            <td>${{ datosArticulos.precio }}</td>
                            <td>{{ datosArticulos.stockMinimo }}</td>
                            <td>{{ datosArticulos.stockMaximo }}</td>            
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="accion==='Consultar'">
                <button @click="btnCancelar()">Cerrar</button>
            </div>
            
            <div class="divBorrar" v-if="accion === 'Borrar'">
                <p class="pBorrar">¿Esta seguro de borrar este ARTICULO?</p>
                <button @click="btnCancelar()">No, volver</button> |
                <button @click="guardarArticulo()">Si, borrar articulo</button>
            </div>
            
        </div>
    </div>
</template>

<script>
import traerAPI from "../mixins/traerAPI.vue";

export default {
    mixins: [traerAPI],

    props: ['accion','id'],

    data(){
        return {
            datosArticulos: {
                nombre: "",
                precio: "",
                fechaVencimiento: "",
                stockMinimo: "",
                stockMaximo: "",
                rubro_id: "",
            },

            rubros: [],
        }
    },

    created(){

    },

    mounted(){
        if(this.accion != "Crear"){
            this.traerDatosPorId("articulos", this.id)
                .then(datos => {
                    this.datosArticulos = datos
                })
        }
    },

    methods: {
        guardarArticulo() {
            if(this.accion == "Crear"){
                if(this.validarCamposVacios()){
                    alert("Rellene los campos vacios o revise que los datos que esta ingresando sean COHERENTES")
                    return
                }else {
                    this.enviarDatosAPI("articulos", this.datosArticulos)
                        .then(datos => {
                            this.datosArticulos = datos
                    }) 
                }
                
            } else if(this.accion == "Editar"){
                if(this.validarCamposVacios()){
                    alert("Rellene los campos vacios o revise que los datos que esta ingresando sean COHERENTES")
                    return
                }else{
                    this.editarDatos("articulos", this.datosArticulos, this.id)
                }
                
            } else {
                this.borrarDatos("articulos", this.id)
            }

            this.$emit("MostrarABMArticulos", false)
            this.$emit("traerArticulos");
        },

        btnCancelar(){
            this.$emit("MostrarABMArticulos", false)
        },  

        validarCamposVacios(){
            let nombre= this.datosArticulos.nombre.trim()
            let precio= this.datosArticulos.precio
            let fechaVenc= this.datosArticulos.fechaVencimiento.trim()
            let stockMin= this.datosArticulos.stockMinimo
            let stockMax= this.datosArticulos.stockMaximo
            let rubroId= this.datosArticulos.rubro_id
            
            if(nombre === "" || precio < 1 || fechaVenc === "" || 
                stockMin > stockMax || stockMax < stockMin || rubroId < 1){
                    return true
            } else{
                return false
            }
        },

        traerRubros(){
            this.traerAPI("rubros")
                .then(datos => {
                        this.rubros = datos
                    }) 
        },

    },
    
}
</script>


<style scoped>
    .formAgregar{
        margin-top: 0px;
        text-align: center;
        margin-left: 30%;
        border: 2px solid black;
        border-radius: 5%;
        background-color: rgb(223, 226, 193);
        margin-bottom: 30px;
        height: 235px;
        width: 45%;
    }

    .divBorrar{
        height: 90px;
        width: 45%;
        border: 2px solid black;
        border-radius: 5%;
        margin-left: 28%;
        background-color: rgb(241, 95, 115);
    }

    .pBorrar{
        font: 20px;
        font-weight: bold;
        color: black;
    }

    table, th, td{
        border: 2px solid rgb(116, 113, 113);
        border-collapse: collapse;
        margin-top: 2%;
        margin-left: 10%;
        margin-bottom: 30px;
        background-color: rgb(255, 255, 255);
    }

    .marco{
        margin-left: 5%;
        padding: 10px;
        border: 2px solid black;
        border-radius: 5%;
        height: 15%;
        width: 90%;
        background-color: rgb(223, 226, 193)
    }
</style>