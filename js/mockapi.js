document.addEventListener("DOMContentLoaded", start);
function start() {
    const additionalMaterialUrl = 'https://685325640594059b23d03fe2.mockapi.io/material-complementario'; 
    const course = document.getElementById("resources-table").dataset.course; //nos traemos el curso del DOM
    const unit = document.getElementById("resources-table").dataset.unit; //nos traemos la unidad del DOM
    const btnForm = document.getElementById("btn-add-or-modify-resource");
    let page  = 1; 
    const pageLimit = 10;
    let modal = document.getElementById("modal-resource");

    document.getElementById("btn-filter").addEventListener("click", (e) => {
        paginate(e);
    })

    document.getElementById("btn-clean-filter").addEventListener("click", function (e) { //deberían irse los filtros al cargar la pagina... 
        cleanFilters();
        paginate(e);
    })

    function cleanFilters() {
        document.getElementById("type-filter").value ="";
        document.getElementById("level-filter").value =""; 
    }

    document.getElementById("btn-before-page").addEventListener("click", (e) => {
        if (page > 1 ){ //aseguramos que no se acceda a una pagina invalida
            page--;
            paginate(e);
        }
    })

    document.getElementById("btn-next-page").addEventListener("click", (e) => {
        page++;
        paginate(e);
    })

    document.getElementById("btn-add-resource").addEventListener("click", () => {
        modal.showModal(); //muestra el modal con el formulario. ¿por qué showModal y no show(): https://webinista.com/demos/dialog-element-tutorial/index.html (para bloquear el resto de la pagina)
        btnForm.innerHTML = "Agregar recurso";
    }); 

    document.getElementById("btn-close-form-popUp").addEventListener("click", () => {
        modal.close();   
    })

    let form = document.getElementById("resource-form");
    form.addEventListener("submit", (e)  => {
            e.preventDefault();
            if(btnForm.innerHTML === "Agregar recurso") {
                addResource(e);
            }
            else {
                editResource(e);
            }
        }
    );

    async function addResource(e) { //anda
        //pedir los datos del formulario
        let formData = new FormData(form);
        //traerme los datos del formulario y guardarlos en variables
        const title = formData.get('title');
        const url = formData.get('url');
        const type = formData.get('type');
        const level = formData.get('level');
        const purpose = formData.get('purpose');
        const description = formData.get('description');
        const topic = formData.get('topic');

        modal.close();

        //crear el objeto JSON válido con los datos extraídos
        const newResource = {
            "title": title,
            "url": url,
            "type": type,
            "level": level,
            "purpose": purpose,
            "description": description,
            "topic": topic,
            "course": course,
            "unit": unit
        } //notar que course y unit no los completa el usuario, ya estan dados por la parte del sitio en la que se encuentre el usuario. 

        //tenemos que agregarlo a mockapi con el método POST
        try {
            let response = await fetch(additionalMaterialUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newResource)
            });
            if (response.status == 201) {
                console.log("agregado el recurso a la api");
                //llamar al mostrar tabla
                paginate(e);
            }
        } catch (error) {
            console.log(error);
        }
    }
   
    async function editResource(e) { //anda
        let formData = new FormData(form);
        //traerme los datos del formulario y guardarlos en variables
        const title = formData.get('title');
        const url = formData.get('url');
        const type = formData.get('type');
        const level = formData.get('level');
        const purpose = formData.get('purpose');
        const description = formData.get('description');
        const topic = formData.get('topic');

        modal.close();
        //crear el objeto JSON válido con los datos extraídos
        const newResource = {
            "title": title,
            "url": url,
            "type": type,
            "level": level,
            "purpose": purpose,
            "description": description,
            "topic": topic,
            "course": course,
            "unit": unit
        } //notar que course y unit no los completa el usuario, ya estan dados por la parte del sitio en la que se encuentre el usuario.
        
        const urlItem = additionalMaterialUrl +"/" + form.dataset.editingItem;
        
        try {
            let response = await fetch(urlItem, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newResource)
            });
            if(response.ok){
                paginate(e);
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function deleteRow(itemToDelete, e) { //anda
        try {
            const urlItem = additionalMaterialUrl + "/" +itemToDelete;
            let response = await fetch(urlItem, {
                method: 'DELETE',
            });
            if(response.ok) {
                paginate(e);
            }
        }   
        catch(error) {
            console.log(error);
        }
    }

    async function paginate(event){
        //PAGINACION. 
        let urlWithPage = new URL (additionalMaterialUrl); //se crea una nueva instancia del objeto para no acumular las page y limit en la url. 
        urlWithPage.searchParams.append('page', page); 
        urlWithPage.searchParams.append('limit', pageLimit); //muestra 10 recursos
        
        //resulta que mockapi al filtrar busca subcadenas del parametro que le pasamos por filtro asi que tuvimos que cambiar videojuego por juego para que no lo tomara cuando buscabamos el tipo video. 
        const typeFilter = document.getElementById("type-filter").value;
        const levelFilter = document.getElementById("level-filter").value; 
        if (typeFilter != "" || levelFilter != "") {
            urlWithPage.searchParams.append('type', typeFilter);
            urlWithPage.searchParams.append('level', levelFilter);
        }

        try {
            let response = await fetch(urlWithPage, {
                method: 'GET',
                headers: {'content-type':'application/json'},
            }); //por defecto el método es GET, no sería necesario
            if (response.ok) {
                console.log(response.status);
                    
                let resources = await response.json();
                console.log(resources);
                /* en esta parte nos vemos obligadas a consultar a MockApi si tiene elementos para mostrar dado que la funcion gratis de la
                aplicacion no da opcion a saber la cantidad de datos subida a la base de datos, por lo que no hay forma de saber si hay siguiente o no.*/
                if (resources.length == 0) { 
                    console.log(page);
                    const buttonActivated = event.target; //con esto consigo el boton que activó el evento. Lo usamos para saber si es el siguiente o el btn de borrar recurso, si es el de siguiente y entró acá es porque no tenía recursos para mostrar en la pagina siguiente. Entonces vamos a dejarle en la pagina actual, no mostramos una lista vacia. 
                    if (buttonActivated.id === "btn-next-page"){
                        page--; //se tocó el botón para la página siguiente. Este es un parche feo, pero necesito saber si hay más elementos el la siguiente pagina o si no, y si no lo hay tengo que dejar el valor de page en la pagina actual. 
                        console.log(page);
                        console.log('no hay elementos para mostrar');
                        return; //
                    } else {
                        //se borró el ultimo elemento
                        showResources(resources);
                    }
                } else {
                    showResources(resources);
                }
            } else {
                if (response.status == 404) {
                    showResources([]);
                    console.log("mockapi no encontró elementos que coincidan con el filtro pedido"); //resulta que mockapi es chistosito y te tira error 404 en vez de un arreglo vacio si no hay elementos que coincidan con el filtro. 
                }
                else {
                    console.log("hubo un error ");
                }
            }  
        }
        catch(error) {
            console.log(error);
        }
    }

    function showResources(resources) { //anda
        let bodyTable = document.getElementById("body-resources");
        bodyTable.innerHTML = "";
    
        for (let resource of resources) {
            let titleField = document.createElement("td");
            titleField.innerHTML = resource.title;

            let urlField = document.createElement("td");
            urlField.innerHTML = resource.url;

            let typeField = document.createElement("td");
            typeField.innerHTML = resource.type;

            let levelField = document.createElement("td");
            levelField.innerHTML = resource.level;

            let descriptionField = document.createElement("td");
            descriptionField.innerHTML = resource.description;

            let purposeField = document.createElement("td");
            purposeField.innerHTML = resource.purpose;

            let topicField = document.createElement("td");
            topicField.innerHTML = resource.topic;

            let btnDelete = document.createElement("button");
            btnDelete.innerHTML = "Eliminar";
            btnDelete.dataset.id = resource.id; //esto se agrega para asociar el boton al id de algo que tiene la api, no es correcto ponerle esto directamente en el id, por eso se usa un data-id que se setea con un dataset.(lo que venga despues del guion). 
            btnDelete.addEventListener("click", (event) => {
                    deleteRow(resource.id, event); //llamo al borrarFila y le paso el identificador del recurso que quiero borrar. 
                }
            );

            let btnModify = document.createElement("button");
            btnModify.innerHTML = "Editar";
            btnModify.dataset.id = resource.id; //capaz no es necesario si ya lo tiene el formulario....
            btnModify.addEventListener("click", () => {
                modal.showModal(); //muestra el modal con el formulario. 

                //NECESITO PODER IDENTIFICAR QUE ELEMENTO ES EL QUE ESTOY MODIFICANDO DESDE EL FORMULARIO. 
                form.dataset.editingItem = resource.id; //esto hace que el form agregue el atributo data-editingItem="{$resource.id}" si no lo tiene o lo actualice si lo tiene. NO va a haber conflicto en los editar porque sólo se activa un formulario a la vez. Y en el agregar este campo no se usa así que no importa si lo tiene o no lo tiene porque hacemos POST y no necesitamos el ID. 


                //acá tengo que mostrar los campos de los inputs con la informacion que tenian en el objeto resource
                document.getElementById("resource-title").value = resource.title;
                document.getElementById("resource-url").value = resource.url;
                document.getElementById("resource-type").value = resource.type;
                document.getElementById("resource-level").value = resource.level;
                document.getElementById("resource-description").value = resource.description;
                document.getElementById("resource-purpose").value = resource.purpose;
                document.getElementById("resource-topic").value = resource.topic;

                //cambio lo que dice el boton para que se sepa que se está editando. Todo esto se hace porque usamos el mismo formulario para editar y para agregar informacion en la tabla. Y sabemos qué se está haciendo a partir del innerHtml del btn-add-or-modify. 
                btnForm.innerHTML = "Actualizar cambios"; 
            });

            let row = document.createElement("tr");
            row.appendChild(titleField);
            row.appendChild(urlField);
            row.appendChild(typeField);
            row.appendChild(levelField);
            row.appendChild(descriptionField);
            row.appendChild(purposeField);
            row.appendChild(topicField);

            row.dataset.id = resource.id; //asociamos la fila con el recurso. 

            let actionsField = document.createElement("td");
            actionsField.appendChild(btnModify);
            actionsField.appendChild(btnDelete);
            row.appendChild(actionsField);
            
            bodyTable.appendChild(row);
        }
    }
    cleanFilters(); //deberían irse los filtros al cargar la pagina... 
    paginate(Event); 
}
