<template>
    <div>
        <div class="formAgregar" v-if="(accion == 'Crear') || (accion =='Editar')">
            <h3>{{ accion }} articulo</h3>
            <form @submit.prevent>
                <span>Nombre: </span>
                <input type="text" v-model="datosArticulos.nombre" required>
                <br>
                <br>
                <span>Precio: </span>
                <input type="text" v-model="datosArticulos.precio" required>
                <br>
                <br>
                <span>Fecha Vencimiento: </span>
                <input type="date" v-model="datosArticulos.fechaVencimiento" required>
                <br>
                <br>
                <span>Stock min: </span>
                <input type="text" v-model="datosArticulos.stockMinimo" required>
                <br>
                <br>
                <span>Stock max: </span>
                <input type="text" v-model="datosArticulos.stockMaximo" required>
                <br>
                <br>
                <span>Rubro: </span>
                <select name="rubro_id" v-model="datosArticulos.rubro_id" required>
                    <option v-for="(rubro, $id) in rubros" 
                        :key="$id"
                        :value="rubro.id">
                            {{rubro.id}}| {{rubro.titulo}}
                    </option>
                </select>
                <br>
                <br>
                <hr>
                <div class="divBtns">
                    <button @click="btnCancelar()">Cancelar</button> | 
                    <button @click="guardarArticulo()">Enviar</button>
                </div>
                
            </form>
        </div>
        
        <div v-if="(accion == 'Borrar') || (accion =='Consultar')" class="marco">
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE ARTICULO</th>
                            <th>RUBRO</th>
                            <th>PRECIO</th>
                            <th>FECHA VENCIMIENTO</th>
                            <th>STOCK MIN</th>
                            <th>STOCK MAX</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td>{{datosArticulos.id}}</td>
                            <td>{{datosArticulos.nombre}}</td>
                            <td>{{datosArticulos.nombre_rubro}} | [{{datosArticulos.rubro_id}}]</td>
                            <td>{{datosArticulos.precio}}</td>
                            <td>{{datosArticulos.fechaVencimiento}}</td>
                            <td>{{datosArticulos.stockMinimo}}</td>
                            <td>{{datosArticulos.stockMaximo}}</td>

                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="accion==='Consultar'">
                <button @click="btnCancelar()">Cerrar</button>
            </div>
            
            <div class="divBorrar" v-if="accion === 'Borrar'">
                <p class="pBorrar">¿Esta seguro de borrar este ARTICULO?</p>
                <button @click="btnCancelar()">No, volver</button> |
                <button @click="guardarArticulo()">Si, borrar articulo</button>
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
            datosArticulos: {
                nombre: "",
                precio: "",
                fechaVencimiento: "",
                stockMinimo: "",
                stockMaximo: "",
                rubro_id: "",
                nombre_rubro:"",
            },


            rubros: [],
        }
    },

    mounted(){
        if(this.accion == "Editar" || this.accion == "Borrar" || this.accion == "Consultar"){
            this.traerDatosPorId("articulos", this.id)
                .then(datos => {
                    this.datosArticulos = datos
                    console.log(JSON.stringify(this.datosArticulos))
                })
            this.traerRubros();
        } else if(this.accion == "Crear"){
            this.traerRubros();
        }
    },

    methods: {
        guardarArticulo() {
            if(this.accion == "Crear"){
                if(this.validarCamposVacios()){
                    alert("Rellene los campos vacios o revise que los datos que esta ingresando sean COHERENTES")
                    return
                }else {
                     this.enviarDatosAPI("articulos", this.datosArticulos)
                        .then(datos => {
                            this.datosArticulos = datos
                    })  
                }
                
            } else if(this.accion == "Editar"){
                if(this.validarCamposVacios()){
                    alert("Rellene los campos vacios o revise que los datos que esta ingresando sean COHERENTES")
                    return
                }else{
                    this.editarDatos("articulos", this.datosArticulos, this.id)
                        .then(datos => {
                            this.datosArticulos = datos     
                        })
                }
                
            } else {
                this.borrarDatos("articulos", this.id)
            }

            setTimeout(() => this.$emit("MostrarABMArticulos", false), 300)
            this.$emit("traerArticulos");
        },

        btnCancelar(){
            this.$emit("MostrarABMArticulos", false)
        },  

        validarCamposVacios(){
            let nombre= this.datosArticulos.nombre.trim()
            let precio= this.datosArticulos.precio
            let fechaVenc= this.datosArticulos.fechaVencimiento.trim()
            let stockMin= this.datosArticulos.stockMinimo
            let stockMax= this.datosArticulos.stockMaximo
            let rubroId= this.datosArticulos.rubro_id
            
            if(nombre === "" || precio < 1 || fechaVenc === "" || 
                stockMin > stockMax || stockMax < stockMin || rubroId < 1){
                    return true
            } else{
                return false
            }
        },

        traerRubros(){
            this.traerDatosAPI("rubros")
                .then(datos => {
                        this.rubros = datos
                    })
        },

    },
    
}
</script>


<style scoped>
    .formAgregar{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin:5px auto 30px auto;
        border: 2px solid black;
        border-radius: 5%;
        background-color: rgb(223, 226, 193);
        min-height: 40%;
        width: 45%;
    }

    .divBorrar{
        height: 90px;
        width: 45%;
        border: 2px solid black;
        border-radius: 5%;
        margin:20px auto 20px auto;;
        background-color: rgb(241, 95, 115);
    }

    .pBorrar{
        font: 20px;
        font-weight: bold;
        color: black;
    }

    table, th, td{
        margin:auto;
        border: 2px solid rgb(116, 113, 113);
        border-collapse: collapse;
        margin:20px auto 20px auto;
        background-color: rgb(255, 255, 255);
    }

    .marco{
        margin:20px auto 40px auto;
        padding: 10px;
        border: 2px solid black;
        border-radius: 5%;
        height: 15%;
        width: 90%;
        background-color: rgb(223, 226, 193)
    }

    .divBtns{
        margin:20px auto 20px auto;
    }

    span{
        font: 15px;
        font-weight: bold;
        color: rgb(48, 47, 47);
    }
</style>