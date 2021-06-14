<script>
export default {
    
    methods:{
        traerDatosAPI(ruta){
            let baseURL = "http://proyectolvc.test/api/"+ ruta;
            return fetch(baseURL, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                //body: JSON.stringify(parametros)
            })
                .then(datos => datos.json())
                .then(datos => {
                    let apiDatos = datos
                    return apiDatos
                })
                .catch(error => console.log("error FETCH: ", error))
        },

        enviarDatosAPI(ruta, datosEnviar){
            let baseURL = "http://proyectolvc.test/api/"+ ruta;
            return fetch(baseURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosEnviar)
                
            })
                .then(datos => datos.json())
                .then(datos => {
                    let apiDatos = datos
                    return apiDatos
                })
                .catch(error => console.log("error FETCH: ", error))
        },


    }
}
</script>