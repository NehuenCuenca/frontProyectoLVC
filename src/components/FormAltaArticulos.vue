<template>
    <div class="formAgregar" >
            <h3>Agregar nuevo articulo</h3>
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
                <button @click="cancelarForm()">Cancelar</button>
                <button @click="guardarArticulo()">Enviar</button>
            </form>
        </div>
</template>

<script>
import traerAPI from "../mixins/traerAPI.vue";

export default {
    mixins: [traerAPI],

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

    methods: {
        guardarArticulo() {
            this.enviarDatosAPI("articulos", this.datosArticulos)
                .then(datos => {
                    this.datosArticulos = datos
                    this.$emit("MostrarABMArticulos", false)
                })
        },

        cancelarForm(){
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
</style>