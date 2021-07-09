<template>
  <div class="home">
    <div class="divBtnInfos">
      <button @click="desplegarInventario()" class="btnAbrirINFO">Inventario</button>
      <button @click="desplegarComprobantesINFO()" class="btnAbrirINFO">Comprobantes INFO</button>
      <button @click="desplegarArticulosINFO()" class="btnAbrirINFO">Articulos INFO</button>
      <button @click="desplegarRubrosINFO()" class="btnAbrirINFO">Rubros INFO</button>
    </div>
    <div class="INFOestilo">
      <INFOarticulos v-if="abrirArticulosINFO == true"/>
      <INFOrubros v-if="abrirRubrosINFO == true"/>
      <INFOcomprobantes v-if="abrirComprobantesINFO == true"/>
      <INFOinventario v-if="abrirInventario == true"/>
      <div>
        <img src="../assets/logo.png" class="logo" width="550px"
            height="230px" @click="refrescarPagina()" title="Refrescar la pagina">
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import INFOarticulos from "../components/INFOarticulos.vue";
import INFOrubros from "../components/INFOrubros.vue";
import INFOcomprobantes from "../components/INFOcomprobantes.vue";
import INFOinventario from "../components/INFOinventario.vue";

export default {
  
  name: 'Home',

  components: {
    INFOarticulos,
    INFOrubros,
    INFOcomprobantes,
    INFOinventario,
  },

  data() {
    return {
      abrirArticulosINFO: false,
      abrirRubrosINFO: false,
      abrirComprobantesINFO: false,
      abrirInventario: true,
    }
  },

  methods:{
    desplegarArticulosINFO(){
      this.abrirArticulosINFO= !this.abrirArticulosINFO;
      this.abrirRubrosINFO= false;
      this.abrirComprobantesINFO= false;
      this.abrirInventario= false;
    },
    
    desplegarRubrosINFO(){
      this.abrirRubrosINFO= !this.abrirRubrosINFO;
      this.abrirArticulosINFO= false;
      this.abrirComprobantesINFO= false;
      this.abrirInventario= false;
    },

    desplegarComprobantesINFO(){
      this.abrirComprobantesINFO= !this.abrirComprobantesINFO;
      this.abrirArticulosINFO= false;
      this.abrirRubrosINFO= false;
      this.abrirInventario= false;
    },

    desplegarInventario(){
      this.abrirInventario= !this.abrirInventario;
      this.abrirArticulosINFO= false;
      this.abrirRubrosINFO= false;
      this.abrirComprobantesINFO= false;
    },

    refrescarPagina(){
      window.location.reload();
    }

  },

}
</script>

<style scoped>
  .home{
    margin: 50px auto 10px auto;
  }

  .logo{ 
    margin: 60px auto 10px auto ;
    cursor: pointer;
  }

  .btnAbrirINFO{
    text-align: center;
    height: 40px;
    width: 80px;
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
    min-width: 160px;
    margin: 10px 10px 10px 10px;
    border: 2px solid black;
    border-radius: 10%;
    cursor: pointer;
    font-size: 20px;
    font-weight: bolder;
  }  

  .INFOestilo{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

</style>