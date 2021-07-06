<template>
    <div class="divInfo">
        <h2>Inventario/Stock</h2>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Articulo</th>
                    <th>rubro_id</th>
                    <th>cantidad_stock</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>Lapiceras</td>
                    <td>3</td>
                    <td>-30</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    
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
        margin:10px auto 10px auto;
        background-color: rgb(255, 255, 255);
    }



</style>