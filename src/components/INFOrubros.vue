<template>
    <div class="divInfo"> 
        <h1>Rubros</h1>
        <button @click="desplegarABMRubro('Crear')">Crear nuevo rubro</button>
        <br>
        <br>
        <ABMrubros 
            v-if="abrirABMrubro == true"
            @MostrarABMRubros="MostrarABMRubros($event)"
            @traerDatos="traerDatos"
            :id=id
            :accion=accion
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
                        <input type="button" 
                                value="Editar" 
                               @click="desplegarABMRubro('Editar', rubro.id)"
                               > 
                        <br> 
                        <input type="button" value="Borrar"
                                @click="desplegarABMRubro('Borrar', rubro.id)">              
                    </td>
                </tr>
            </tbody>
        </table>

        
    </div>
</template>

<script>
    import traerAPI from "../mixins/traerAPI.vue";
    import ABMrubros from "../components/ABMrubros.vue";

    export default {
        name: "INFORubros",

        mixins: [traerAPI],
        
        components: {
            ABMrubros,
        },

        created(){
            this.traerDatos();       
        },

        data(){
            return {
                rubros: [],
                abrirABMrubro: false,
                accion: "",
                id: 0,
            }
        },

        methods:{
            traerDatos(){
                console.log("Obteniendo RUBROS desde la API...");
                this.traerDatosAPI("rubros")
                    .then(datos => {
                        this.rubros = datos
                    })      
            },

            desplegarABMRubro(accion, id=0){
                this.accion= accion;
                this.id= id;
                this.abrirABMrubro = !this.abrirABMrubro;
            },

            MostrarABMRubros(ver){
                this.abrirABMrubro = ver
                this.traerDatos();
            },

        },

    }
</script>

<style scoped>

    .divInfo{
        margin-top: 2%;     
        border-style: double;
        width: 60%;
        margin-left: 20%;
        background-color: rgb(186, 190, 247);
        margin-bottom: 25px;
    }

    table, th, td{
        margin-top: 2%;
        border: 2px solid rgb(116, 113, 113);
        border-collapse: collapse;
        margin-left: 25%;
        margin-bottom: 30px;
        background-color: rgb(255, 255, 255);
    }

</style>