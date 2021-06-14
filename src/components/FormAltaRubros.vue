<template>
    <div class="formAgregar">
        <h4>Agregar nuevo rubro</h4>
        <form>
            <span>Nombre</span>
            <input type="text" placeholder="Nombre rubro..." v-model="datosRubros.titulo">
            <br>
            <button @click="cancelarForm()">Cancelar</button>
            <button @click="guardarRubro()">Enviar</button>
        </form>
    </div>
</template>

<script>
import traerAPI from "../mixins/traerAPI.vue";

export default {
    mixins: [traerAPI],

    data(){
        return {
            datosRubros: {
                titulo: "",
            },

        }
    },

    methods: {
        guardarRubro(){
            this.enviarDatosAPI('rubros', this.datosRubros)
                .then(datos => {
                    this.datosRubros = datos
                    this.$emit("MostrarABMRubros", false)
                })   
        },
        
        cancelarForm(){
            this.$emit("MostrarABMRubros", false)
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
        height: 120px;
        width: 45%;
    }
</style>