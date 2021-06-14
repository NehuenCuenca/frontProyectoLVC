<template>
    <div>
        <h1>ABM articulos</h1>
        <button @click="desplegarFormArticulo('Crear')">Crear nuevo articulo</button>
        <br>
        <br>
        <FormAltaArticulos 
            v-if="abrirFormAlta == true"
            @MostrarABMArticulos="MostrarABMArticulos($event)">
        </FormAltaArticulos>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre_articulo</th>
                    <th>FechaVencimiento</th>
                    <th>Rubro_id</th>
                    <th>Precio</th>
                    <th>S_Minimo</th>
                    <th>S_Maximo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            
            <tbody>
                <tr v-for="(articulo, index) in articulos" :key="index">
                    <td>{{ articulo.id }}</td>
                    <td>{{ articulo.nombre }}</td>
                    <td>{{ articulo.fechaVencimiento }}</td>
                    <td>{{ articulo.rubro_id }}</td>
                    <td>${{ articulo.precio }}</td>
                    <td>{{ articulo.stockMinimo }}</td>
                    <td>{{ articulo.stockMaximo }}</td>

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
    import FormAltaArticulos from "../components/FormAltaArticulos.vue";

    export default {
        name: "Articulos",

        components: {
            FormAltaArticulos,
        },

        mixins: [traerAPI],

        created(){
            this.traerDatos();     
        },

        data(){
            return {
                articulos: [],
                abrirFormAlta: false,
            }
        },

        methods:{
            traerDatos(){
                this.traerDatosAPI("articulos")
                .then(datos => {
                    this.articulos = datos
                })
            },

            desplegarFormArticulo(){
                this.abrirFormAlta = !this.abrirFormAlta;
            },

            MostrarABMArticulos(ver){
                this.abrirFormAlta = ver
                this.traerDatos();
            }
            
        }
    }
</script>

<style scoped>
    div{
        margin-top: 2%;   
        border-style: double;
        width: 60%;
        margin-left: 20%;
        background-color: rgb(242, 250, 172);
    }

    table, th, td{
        border: 2px solid rgb(116, 113, 113);
        border-collapse: collapse;
        margin-left: 9%;
        margin-bottom: 50px;
        background-color: rgb(255, 255, 255);
    }

    

</style>