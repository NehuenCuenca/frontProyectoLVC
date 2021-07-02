<template>
    <div class="divInfo">
        <h1>Articulos</h1>
        <button @click="desplegarABMArticulo('Crear')">Crear nuevo articulo</button>
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
                    <th>Nombre_articulo</th>
                    <th>Rubro</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            
            <tbody>
                <tr v-for="(articulo, id) in articulos" :key="id">
                    <td>{{ articulo.id }}</td>
                    <td>{{ articulo.nombre }}</td>
                    <td>[{{articulo.rubro_id}}] | {{ articulo.nombre_rubro }} </td>

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
                id: 4,
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
            }
            
        }
    }
</script>

<style scoped>
    .divInfo{
        
        margin-top: 2%;   
        border-style: double;
        width: 60%;
        margin-left: 20%;
        background-color: rgb(229, 235, 162);
        margin-bottom: 25px;
    }

    table, th, td{
        border: 2px solid rgb(116, 113, 113);
        border-collapse: collapse;
        margin-top: 2%;
        margin-left: 15%;
        margin-bottom: 30px;
        background-color: rgb(255, 255, 255);
    }

    
</style>