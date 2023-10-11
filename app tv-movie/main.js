let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
//funcion para avanzar de pagina
btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPelicula();
	}
});
//funcion para retroceder de pagina
btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPelicula();
	}
});

const cargarPelicula= async ()=>{
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);

        if (res.status == 200) {
            const DATOS = await res.json();
            let peliculas = '';
            // crea un contenedor con los datos de cada pelicula
            DATOS.results.forEach(pelicula => {
                let nombre = pelicula.title;
                peliculas += `
                <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                <h3 class="titulo">${nombre}</h3>
                </div>
                `    
            });
            document.getElementById('contenedor').innerHTML = peliculas;
        //en caso de error se lanzara un mensaje por consula indicando que ocurrio
        } else if (res.status == 401){
            console.log('ocurrio un  error');
        } else if (res.status == 404){
            console.log('ocurrio un  error');
        }else{console.log('algo salio mal :(')}
    } catch (error) {
        console.log(error)
    }
}
cargarPelicula()