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
                    console.log(apiDatos)
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

        traerDatosPorId(ruta, id){
            let baseURL = "http://proyectolvc.test/api/"+ ruta + "/" + id;
            return fetch(baseURL, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(datos => datos.json())
                .then(datos => {
                    let apiDatos = datos
                    //console.log(apiDatos)
                    return apiDatos
                })
                .catch(error => console.log("error FETCH: ", error))
        },

        editarDatos(ruta, datosEnviar, id){
            let baseURL = "http://proyectolvc.test/api/"+ ruta + "/" + id;
            return fetch(baseURL, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosEnviar)
            })
                .catch(error => console.log("error FETCH: ", error))
        },

        borrarDatos(ruta, id){
            let baseURL = "http://proyectolvc.test/api/"+ ruta + "/" + id;
            return fetch(baseURL, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .catch(error => console.log("error FETCH: ", error))
        },

    }
}
</script>