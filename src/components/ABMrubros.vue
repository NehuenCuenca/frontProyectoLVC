<template>
    <div>
        <div class="formABM" v-if="accion != 'Borrar'">
            <h4>{{ accion }} rubro</h4>
            <form>
                <span>Nombre:</span>
                <input type="text" placeholder="Nombre rubro..." v-model="datosRubros.titulo">
                <br>
                <button @click="cancelarForm()">Cancelar</button>
                <button @click="guardarRubro()">Enviar</button>
            </form>
        </div>

        <div class="divBorrar" v-if="accion == 'Borrar'">
            <p class="pBorrar">¿Esta seguro de borrar este RUBRO?</p>
            <button @click="cancelarForm()">No, volver</button> |
            <button @click="guardarRubro()">Si, borrar rubro</button>
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
            datosRubros: {
                titulo: "",
            },

        }
    },

    mounted(){
        if(this.accion != "Crear"){
            this.traerDatosPorId('rubros', this.id)
                .then(datos => {
                        console.log(datos)
                        this.datosRubros = datos
                    })
        }
    },

    methods: {
        guardarRubro(){
            if(this.accion == "Crear"){
                this.enviarDatosAPI('rubros', this.datosRubros)
                    .then(datos => {
                        this.datosRubros = datos     
                    }) 
            } else if(this.accion == "Editar") {
                this.editarDatos('rubros', this.datosRubros, this.id)
                    .then(datos => {
                        this.datosRubros = datos     
                    })   
            } else {
                console.log(this.id)
                this.borrarDatos('rubros', this.id)
            }
            this.$emit("traerDatos");
            this.$emit("MostrarABMRubros", false);
        },
        
        cancelarForm(){
            this.$emit("MostrarABMRubros", false)
        }

    },
}
</script>


<style scoped>
    .formABM{
        text-align: center;
        margin-left: 30%;
        border: 2px solid black;
        border-radius: 5%;
        background-color: rgb(223, 226, 193);
        margin-bottom: 30px;
        height: 120px;
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