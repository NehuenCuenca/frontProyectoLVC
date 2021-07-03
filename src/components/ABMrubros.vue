<template>
    <div>
        <div class="formABM" v-if="(accion == 'Crear') || (accion =='Editar')">
            <h4>{{ accion }} rubro</h4>
            <form @submit.prevent>
                <span>Nombre: </span>
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

            setTimeout(() => this.$emit("MostrarABMRubros", false), 300)
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin:15px auto 20px auto;;
        border: 2px solid black;
        border-radius: 5%;
        background-color: rgb(171, 176, 253);
        min-height: 140px;
        width: 45%;
    }
    
    .divBorrar{
        margin:5px auto 20px auto;
        height: 80px;
        width: 62%;
        border: 2px solid black;
        border-radius: 5%;
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
        background-color: rgb(255, 255, 255);
        margin:20px auto 20px auto;
    }

    .marco{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin:10px auto 20px auto;
        padding: 10px;
        border: 2px solid black;
        border-radius: 5%;
        height: 15%;
        width: 60%;
        background-color: rgb(154, 159, 245);
    }

    .divBtns{
        margin:10px auto 10px auto;
    }

    span{
        font: 15px;
        font-weight: bold;
        color: rgb(48, 47, 47);
    }

</style>