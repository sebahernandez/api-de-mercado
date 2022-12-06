const search = document.getElementById('table-search');
const codeSearch = document.getElementById('table-code');
const mensajeError = document.getElementById('mensaje-error');

const api =
"https://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarComprador?ticket=5F4BE76F-B904-4023-A8F7-E69AC185D866";

const parseData = (data) => {
    const empresas = []
    data.listaEmpresas.forEach(empresa => {
        // destructurando el objeto
        const { CodigoEmpresa, NombreEmpresa } = empresa
        empresas.push({ codigo: CodigoEmpresa, nombre: NombreEmpresa})
      })
     console.log("Empresas: ", empresas);

     let body = '';
     for(let i = +1; i <= empresas.length -1; i++) {
        body += `<tr class="border-b">
        <td class="bg-gray-100 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${[i]}</td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${empresas[i].codigo}</td>
        <td class="bg-gray-100 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${empresas[i].nombre}</td>
        </tr>`
    }
  document.getElementById('data').innerHTML = body;
}


fetch(api)
.then((response) => response.json())
.then((data) => {
  parseData(data)
  
})
.catch((error) => {
  console.error("Error:", error);
});


// Input de busqueda
search.addEventListener("input", e => {
  filtrarEmpresa();
});

// Input de busqueda por codigo
codeSearch.addEventListener("input", e => {
  console.log("codigo: ", codeSearch.value);
  filtrarCodigo();
});



//function filtrar datos
function filtrarEmpresa(){

  let filter = search.value.toUpperCase()
  let table = document.getElementById("data");
  let tr = table.getElementsByTagName("tr");

  for (let i = +1; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      let txtValue = td.textContent || td.innerText;
      console.log(txtValue.toUpperCase().indexOf(filter))
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";

      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// filtrar por codigo
function filtrarCodigo(){
  
    let filter = codeSearch.value.toUpperCase();
    let table = document.getElementById("data");
    let tr = table.getElementsByTagName("tr");
  
    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";

        }
      }
    }
}