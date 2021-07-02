<template>
  <div class="home">
    <h1 class="titulo">TradeMark S.A</h1>
    <div class="divBtnInfos">
      <button @click="desplegarArticulosABM()" class="btnAbrirABM">Articulos ABM</button>
      <button @click="desplegarRubrosABM()" class="btnAbrirABM">Rubros ABM</button>
      <button @click="desplegarComprobantesABM()" class="btnAbrirABM">Comprobantes ABM</button>
    </div>
    <div class="ABMestilo">
      <INFOarticulos v-if="abrirArticulosABM == true"></INFOarticulos>
      <INFOrubros v-if="abrirRubrosABM == true"></INFOrubros>
      <INFOcomprobantes v-if="abrirComprobantesABM == true"/>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import INFOarticulos from "../components/INFOarticulos.vue";
import INFOrubros from "../components/INFOrubros.vue";
import INFOcomprobantes from "../components/INFOcomprobantes.vue";

export default {
  
  name: 'Home',

  components: {
    INFOarticulos,
    INFOrubros,
    INFOcomprobantes,
  },

  data() {
    return {
      abrirArticulosABM: false,
      abrirRubrosABM: false,
      abrirComprobantesABM: false,
    }
  },

  methods:{
    desplegarArticulosABM(){
      this.abrirArticulosABM= !this.abrirArticulosABM;
      this.abrirRubrosABM= false;
      this.abrirComprobantesABM= false;
    },
    
    desplegarRubrosABM(){
      this.abrirRubrosABM= !this.abrirRubrosABM;
      this.abrirArticulosABM= false;
      this.abrirComprobantesABM= false;
    },

    desplegarComprobantesABM(){
      this.abrirComprobantesABM= !this.abrirComprobantesABM;
      this.abrirArticulosABM= false;
      this.abrirRubrosABM= false;
    }

  },

}
</script>

<style scoped>


  .btnAbrirABM{
    text-align: center;
    height: 40px;
    width: 80px;
  }

  .titulo{
    margin-top: -40px;
  }

  .divBtnInfos{
    display: flex;
    align-content: space-between;
    background-color: rgb(250, 214, 114);
    padding: 10px;
    border: 2px solid black;
    justify-content: center;
    
  }

  .divBtnInfos button {
    background-color: rgb(247, 238, 238);
    height: 60px;
    width: 160px;
    margin: 10px;
    text-align: center;
    border: 2px solid black;
    border-radius: 10%;
    cursor: pointer;
    font-size: 20px;
    font-weight: bolder;
  }  

  .ABMestilo{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

</style>