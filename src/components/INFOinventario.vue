<template>
    <div class="divInfo">
        <h2>Inventario/Stock</h2>
        <div class="divFiltros">
            <h4>FILTROS</h4>
            <span>Numero rubro: </span>
            <input type="number" v-model="numRubro" title="Ingrese 0 para filtrar todos los rubros " min="0">
            <br>
            <br>
            <span>Fecha: </span>
            <input type="date" v-model="fechaParametro">
            <br>
            <br>
            <button @click="filtrarStock()">Filtrar</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>ARTICULO</th>
                    <th>RUBRO</th>
                    <th>CANTIDAD STOCK</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(registro, id) in inventario" :key="id">
                    <td>{{registro.id}}</td>
                    <td>{{registro.nombre}}</td>
                    <td>{{registro.rubro_id}}</td>
                    <td>{{registro.stock}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import traerAPI from "../mixins/traerAPI.vue";

export default {

    mixins:[traerAPI],

    created(){
        this.armarFecha();
        this.traerStock(0,this.fechaParametro);
    },

    data(){
        return {
            inventario:[],
            numRubro: 0,
            fechaParametro:"",
        }
    },

    methods: {
        traerStock(num,fecha){
                console.log("Obteniendo STOCK desde la API...");
                this.traerDatosAPI(`inventario/${num}/${fecha}`)
                    .then(datos => {
                        if(datos == false){
                            alert("ERROR: compruebe que el rubro ingresado EXISTA o que tenga al menos 1 ARTICULO ASOCIADO")
                            this.armarFecha()
                            this.numRubro= 0
                            this.traerStock(this.numRubro,this.fechaParametro)
                        }
                        this.inventario = datos
                    })
                    
        },

        armarFecha(){
            let date = new Date()

            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()

            if(month < 10){
                this.fechaParametro=`${year}-0${month}-${day}`
                if(day < 10){
                    this.fechaParametro=`${year}-0${month}-0${day}`
                }
            }else{
                this.fechaParametro=`${year}-${month}-${day}`
            }
        },

        filtrarStock(){
            /* if(this.numRubro < 0 || this.fechaParametro==""){
                alert("Error: Revise que el numero de rubro ingresado sea MAYOR o IGUAL a 0 (cero) y que la fecha no este vacia.")
                return
            } */  
            this.traerStock(this.numRubro,this.fechaParametro) 
        },
    }
}
</script>


<style scoped>

    .divInfo{
        min-height: 400px;
        border-style: double;
        width: 60%;
        margin:20px auto 20px auto;
        background-color: rgb(191, 235, 162);
    }

    table, th, td{
        border: 2px solid rgb(116, 113, 113);
        border-collapse: collapse;
        margin:20px auto 10px auto;
        padding: 5px 5px 5px 5px;
        background-color: rgb(255, 255, 255);
        font-size: 18px;
        font-style: italic;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 555;
    }

    .divFiltros{
        border: 2px black solid;
        border-radius: 10px;
        min-height: 50px;
        width: 50%;
        margin: 10px auto 10px auto;
        padding: 0px 10px 10px 10px ;
        background-color:rgb(150, 229, 183);
    }
    
    span{
        font: 15px;
        font-weight: bold;
        color: rgb(48, 47, 47);
    }


</style>