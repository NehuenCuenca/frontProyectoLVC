<template>
    <div>
        <h1>ABM rubros</h1>
        <button @click="desplegarFormRubro('Crear')">Crear nuevo rubro</button>
        <br>
        <br>
        <FormAltaRubros 
            v-if="abrirFormAlta == true"
            @MostrarABMRubros="MostrarABMRubros($event)"
        />
    
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre_rubro</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            
            <tbody>
                <tr v-for="(rubro, index) in rubros" :key="index">
                    <td>{{ rubro.id }}</td>
                    <td>{{ rubro.titulo }}</td>

                    <td>
                        <input type="button" value="Editar"> 
                        <br> 
                        <input type="button" value="Borrar">
                    </td>
                </tr>
            </tbody>
        </table>

        
    </div>
</template>

<script>
    import traerAPI from "../mixins/traerAPI.vue";
    import FormAltaRubros from "../components/FormAltaRubros.vue";

    export default {
        name: "Rubros",

        mixins: [traerAPI],
        
        components: {
            FormAltaRubros,
        },

        created(){
            this.traerDatos();       
        },

        data(){
            return {
                rubros: [],
                abrirFormAlta: false,
            }
        },

        methods:{
            traerDatos(){
                this.traerDatosAPI("rubros")
                    .then(datos => {
                        this.rubros = datos
                    })      
            },

            desplegarFormRubro(){
                this.abrirFormAlta = !this.abrirFormAlta;
            },

            MostrarABMRubros(ver){
                this.abrirFormAlta = ver
                this.traerDatos();
            }

        },

    }
</script>

<style scoped>

    div{
        margin-top: 2%;     
        border-style: double;
        width: 60%;
        margin-left: 20%;
        background-color: rgb(186, 190, 247);
    }

    table, th, td{
        border: 2px solid rgb(116, 113, 113);
        border-collapse: collapse;
        margin-left: 30%;
        margin-bottom: 50px;
        background-color: rgb(255, 255, 255);
    }

</style>