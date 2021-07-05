<template>
    <div class="divInfo"> 
        <h1>Rubros</h1>

        <button @click="desplegarABMRubro('Crear')"
            style="margin:10px auto 10px auto;">
            Crear nuevo rubro
        </button>

        <div class="divFiltros" v-show="!accion">
            <h4>FILTROS</h4>
            <input type="text" v-model="busqueda" placeholder="Buscar rubro por nombre">
        </div>
        <ABMrubros 
            v-if="abrirABMrubro == true"
            @MostrarABMRubros="MostrarABMRubros($event)"
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
                <tr v-for="(rubro, index) in filtroNombreRubro" :key="index">
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
                busqueda:"",
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
                this.accion = "";
            },

        },

        computed:{
            filtroNombreRubro(){
                return this.rubros.filter((elem)=>elem.titulo.toLowerCase().includes(this.busqueda.trim().toLowerCase()))
            },
        },

    }
</script>

<style scoped>

    .divInfo{
        min-height: 400px;   
        border-style: double;
        width: 60%;
        margin:20px 20% 20px 20%;
        background-color: rgb(186, 190, 247);
    }

    table, th, td{
        border: 2px solid rgb(116, 113, 113);
        border-collapse: collapse;
        margin:30px auto 20px auto;
        background-color: rgb(255, 255, 255);
    }
    
    .divFiltros{
        border: 2px black solid;
        border-radius: 10px;
        min-height: 50px;
        width: 50%;
        margin: 10px auto 10px auto;
        padding: 10px;
        background-color:thistle;
    }
    
    h4{
        margin: 5px;
    }

</style>