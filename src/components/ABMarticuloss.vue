<template>
    <div>
        <div class="formAgregar" v-if="accion != 'Borrar'">
            <h3>{{ accion }} articulo</h3>
            <form>
                <span>Nombre</span>
                <input type="text" v-model="datosArticulos.nombre">
                <br>
                <span>Precio</span>
                <input type="text" v-model="datosArticulos.precio">
                <br>
                <span>Fecha Vencimiento</span>
                <input type="text" v-model="datosArticulos.fechaVencimiento">
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
        
        <div class="divBorrar" v-if="accion == 'Borrar'">
            <p class="pBorrar">¿Esta seguro de borrar este ARTICULO?</p>
            <button @click="btnCancelar()">No, volver</button> |
            <button @click="guardarArticulo()">Si, borrar articulo</button>
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
        }
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
                this.enviarDatosAPI("articulos", this.datosArticulos)
                    .then(datos => {
                        this.datosArticulos = datos
                })
            } else if(this.accion == "Editar"){
                this.editarDatos("articulos", this.datosArticulos, this.id)
            } else {
                this.borrarDatos("articulos", this.id)
            }

            this.$emit("MostrarABMArticulos", false)
            this.$emit("traerArticulos");
        },

        btnCancelar(){
            this.$emit("MostrarABMArticulos", false)
        }
    
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
</style>