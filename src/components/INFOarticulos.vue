<template>
    <div class="divInfo">
        <h1>Articulos</h1>

        <button @click="desplegarABMArticulo('Crear')"
                style="margin:10px auto 10px auto;">
                    Crear nuevo articulo
        </button>

        <div class="divFiltros" v-show="!accion">
            <h4>FILTROS</h4>
            <input type="text" v-model="busqueda" placeholder="Buscar articulo por RUBRO">
        </div>

        
        
        <br>
        <br>
        <ABMarticuloss 
            v-if="abrirABMarticulo == true"
            :accion=accion
            :id=id
            @MostrarABMArticulos="MostrarABMArticulos($event)"
            />

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Articulo</th>
                    <th>Rubro</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            
            <tbody>
                <tr v-for="(articulo, id) in filtroNombreArticulo" 
                        :key="id">
                    <td>{{ articulo.id }}</td>
                    <td>{{ articulo.nombre }}</td>
                    <td>{{ articulo.nombre_rubro }} [{{articulo.rubro_id}}] </td>

                    <td>
                        <input type="button" value="Editar"
                            @click="desplegarABMArticulo('Editar', articulo.id)"> 
                        <br> 
                        <input type="button" value="Borrar"
                            @click="desplegarABMArticulo('Borrar', articulo.id)"> 
                        <br>
                        <input type="button" value="Consultar"
                            @click="desplegarABMArticulo('Consultar', articulo.id)">
                    </td> 
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import traerAPI from "../mixins/traerAPI.vue";
    import ABMarticuloss from "../components/ABMarticuloss.vue";

    export default {
        name: "INFOArticulos",

        components: {
            ABMarticuloss,
        },

        mixins: [traerAPI],

        created(){
            this.traerArticulos();     
        },

        data(){
            return {
                articulos: [],
                abrirABMarticulo: false,
                accion: "",
                id: 0,
                busqueda:"",
            }
        },

        methods:{
            traerArticulos(){
                console.log("Obteniendo ARTICULOS desde la API...");
                this.traerDatosAPI("articulos")
                .then(datos => {
                    this.articulos = datos
                })
            },

            desplegarABMArticulo(accion, id=0){
                this.accion= accion;
                this.id = id;
                this.abrirABMarticulo = !this.abrirABMarticulo;
            },

            MostrarABMArticulos(ver){
                this.abrirABMarticulo = ver
                this.traerArticulos();
                this.accion= "";
            }
            
        },

        computed:{
            filtroNombreArticulo(){
                return this.articulos.filter((elem)=>elem.nombre_rubro.toLowerCase().includes(this.busqueda.trim().toLowerCase()))
            },
        },
    }
</script>

<style scoped>
    .divInfo{
        min-height: 400px;
        border-style: double;
        width: 60%;
        margin:20px auto 20px auto;
        background-color: rgb(229, 235, 162);
    }

    table, th, td{
        border: 2px solid rgb(116, 113, 113);
        border-collapse: collapse;
        margin:10px auto 10px auto;
        background-color: rgb(255, 255, 255);
    }
    
    .divFiltros{
        border: 2px black solid;
        border-radius: 10px;
        min-height: 50px;
        width: 50%;
        margin: 20px auto -20px auto;
        padding: 10px;
        background-color:rgb(243, 214, 159);

    }
    
    h4{
        margin: 5px;
    }
</style>