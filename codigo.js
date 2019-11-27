window.onload = function (){
    
    var map = L.map("map",{
    measureControl:true,
    center: [-24.5, -51],
    zoom: 7.5,
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    minZoom: 4.5,
    maxZoom: 18
    })
	
// Estilo do mapa
     var OpenStreetMap2 = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map); 
    
/*      //adicionando o shape
    var geojsonLayer = new L.geoJson.ajax("bacias.geojson");       
    geojsonLayer.addTo(map); */
    
     var municipio = L.geoJSON(municipios, {
    style: function(feicao){ console.log(feicao.properties['PIB dos 40']);
    if(feicao.properties['PIB dos 40']<30000){
        return{
      weight: 0.2,
      color: "#000",
      fillColor: "#7b7b7b",
      fillOpacity: 1
    }}
    if((feicao.properties['PIB dos 40']>=30000) && (feicao.properties['PIB dos 40']<45000)){
        return{
      weight: 0.2,
      color: "#000",
      fillColor: "#ffc86d",
      fillOpacity: 1
    }} 
    if((feicao.properties['PIB dos 40']>=45000)&& (feicao.properties['PIB dos 40']<105459)){
        return{
      weight: 0.2,
      color: "#000",
      fillColor: "#ff8f17",
      fillOpacity: 1
    }}   
    },
    onEachFeature: function (feicao, camada){
    camada.bindTooltip(feicao.properties['nome'])
    } 
    }).addTo(map); 
    
    var bacia = L.geoJSON(bacias, {
        style: function(feicao){
            return{
            weight: 0.5,
            fillOpacity: 0
            }
    },
    onEachFeature: function (feicao, camada){
    camada.bindTooltip(feicao.properties['nome'])
    }
    }).addTo(map); 

//Adicionar objetos ao controle de camadas Produto Interno Bruto Per Capita
var basemap = {
    "OSM": OpenStreetMap2
};

var overlayers = {
    "PIB percapita <br> <img src='legenda/cinza.png' /> >=10.000 à <30.000 <br> <img src='legenda/laranja_claro.png' /> >= 30.000 à <45.000 <br> <img src='legenda/laranja.png' /> >=45.000": municipio,
    "Bacias Hidrográficas": bacia
};



L.control.layers(basemap, overlayers).addTo(map);





}




