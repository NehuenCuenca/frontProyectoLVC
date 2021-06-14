<template>
  <div class="home">
    <h1 class="titulo">TradeMark S.A</h1>
    <div>
      <button @click="desplegarArticulosABM()" class="btnAbrirABM">Articulos ABM</button>
      <button @click="desplegarRubrosABM()" class="btnAbrirABM">Rubros ABM</button>
    </div>
    <ArticulosABM v-if="abrirArticulosABM == true"></ArticulosABM>
    <RubrosABM v-if="abrirRubrosABM == true"></RubrosABM>
  </div>
</template>

<script>
// @ is an alias to /src
import ArticulosABM from "../components/ArticulosABM.vue";
import RubrosABM from "../components/RubrosABM.vue";

export default {
  
  name: 'Home',

  components: {
    ArticulosABM,
    RubrosABM,
  },

  data() {
    return {
      abrirArticulosABM: false,
      abrirRubrosABM: false,
    }
  },

  methods:{
    desplegarArticulosABM(){
      this.abrirArticulosABM= !this.abrirArticulosABM;
      this.abrirRubrosABM= false;
    },
    
    desplegarRubrosABM(){
      this.abrirArticulosABM= false;
      this.abrirRubrosABM= !this.abrirRubrosABM;
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
</style>