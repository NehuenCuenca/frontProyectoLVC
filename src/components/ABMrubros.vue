<template>
    <div>
        <div class="formABM" v-if="(accion == 'Crear') || (accion =='Editar')">
            <h4>{{ accion }} rubro</h4>
            <form @submit.prevent>
                <span>Nombre:</span>
                <input type="text" placeholder="Nombre rubro..." v-model="datosRubros.titulo">
                <br>
                <br>
                <button @click="cancelarForm()">Cancelar</button>
                <button @click="guardarRubro()">Enviar</button>
            </form>
        </div>

        <div v-if="accion == 'Borrar'" class="marco">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre_rubro</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr>
                        <td>{{ datosRubros.id }}</td>
                        <td>{{ datosRubros.titulo }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="divBorrar">
                <p class="pBorrar">¿Esta seguro de borrar este RUBRO?</p>
                <div class="divBtns"> 
                    <button @click="cancelarForm()">No, volver</button> |
                    <button @click="guardarRubro()">Si, borrar rubro</button>
                </div>
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
                if(this.validarCamposVacios()){
                    alert("Rellene el campo de NOMBRE del rubro, por favor");
                    return
                }else {
                    this.enviarDatosAPI("rubros", this.datosRubros)
                        .then(datos => {
                            this.datosRubros = datos
                    }) 
                }     
            } else if(this.accion == "Editar") {
                if(this.validarCamposVacios()){
                    alert("Rellene el campo de NOMBRE del rubro, por favor");
                    return
                }
                this.editarDatos('rubros', this.datosRubros, this.id)
                    .then(datos => {
                        this.datosRubros = datos     
                    })   
            } else {
                console.log(this.id)
                this.borrarDatos('rubros', this.id)
            }

            //this.$emit("traerDatos");
            setTimeout(() => this.$emit("MostrarABMRubros", false), 300)
            this.$emit("traerDatos");
        },
        
        cancelarForm(){
            this.$emit("MostrarABMRubros", false)
        },

        validarCamposVacios(){
            let titulo = this.datosRubros.titulo.trim()
            console.log(titulo)
            return (titulo === "" ? true : false)
        },

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
        height: 140px;
        width: 45%;
    }
    
    .divBorrar{
        height: 80px;
        width: 62%;
        border: 2px solid black;
        border-radius: 5%;
        margin-left: 20%;
        background-color: rgb(241, 95, 115);
    }

    .pBorrar{
        font: 20px;
        font-weight: bold;
        color: black;
    }

    table, th, td{
        margin-top: 2%;
        border: 2px solid rgb(116, 113, 113);
        border-collapse: collapse;
        margin-left: 23%;
        margin-bottom: 30px;
        background-color: rgb(255, 255, 255);
    }

    .marco{
        margin-left: 20%;
        margin-bottom: 5%;
        padding: 10px;
        border: 2px solid black;
        border-radius: 5%;
        height: 15%;
        width: 60%;
        background-color: rgb(154, 159, 245);
    }

    .divBtns{
        margin-top: 1px;
        margin-bottom: 10px;
    }
</style>