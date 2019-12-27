var campos={
    btn_nombre:'fields/pre/nombre.html',
    btn_ap_paterno:'fields/pre/paterno.html',
    btn_ap_materno:'fields/pre/materno.html',
    btn_dni:'fields/pre/dni.html',
    btn_telefono:'fields/pre/telefono.html',
    btn_correo:'fields/pre/correo.html',
    btn_cliente:'fields/pre/cliente.html',
    btn_comunicacion:'fields/pre/comunicacion.html',
};
var camposAdd={
    new_text:'fields/add/text.html',
    new_textarea:'fields/add/textarea.html',
    new_number:'fields/add/number.html',
    new_image:'fields/add/image.html',
    new_fecha:'fields/add/fecha.html',
    new_archivo:'fields/add/archivo.html',
    new_opcionU:'fields/add/opcionU.html',
    new_opcionM:'fields/add/opcionM.html',
    new_lista:'fields/add/lista.html',
};
var camposDial={
    new_text:'dialogos/text.html',
    new_textarea:'dialogos/textarea.html',
    new_number:'dialogos/number.html',
    new_image:'dialogos/image.html',
    new_fecha:'dialogos/fecha.html',
    new_archivo:'dialogos/archivo.html',
    new_opcionU:'dialogos/opcionU.html',
    new_opcionM:'dialogos/opcionM.html',
    new_lista:'dialogos/lista.html',
};
var html_types={
    btn_nombre:['input','text'],
    btn_ap_paterno:['input','text'],
    btn_ap_materno:['input','text'],
    btn_dni:['input','text'],
    btn_telefono:['input','text'],
    btn_correo:['input','text'],
    btn_cliente:['input','radio'],
    btn_comunicacion:['input','radio'],
    new_text:['input','text'],
    new_textarea:['textarea',''],
    new_number:['input','number'],
    new_image:['input','file'],
    new_fecha:['input','date'],
    new_archivo:['input','file'],
    new_opcionU:['input','radio'],
    new_opcionM:['input','checkbox'],
    new_lista:['select',''],
}
var campos_agregados=[];
var selector, tag, req;
var k = 0;
var field_options=[];
var formulario;

function Quitar(id){    
    selector = id.split("form_")[1].split("_close")[0];
    $("#"+id.split("_close")[0]).remove();
    $("#"+selector).removeClass("bg-info");
    $("#"+selector+"_btn").removeClass("fa-minus");
    $("#"+selector+"_btn").addClass("fa-plus");
    for(i=0; i<campos_agregados.length;i++){
        if(campos_agregados[i].id==selector)
            campos_agregados.splice(i,1);
    }
    console.log(campos_agregados);
}

$(document).ready(function(){
    $("#FormBuilderDB").load("view.html", ()=>{        
        $("[id*='btn_']").click((id)=>{
            var selector = id.currentTarget.id;
            var index;
            for(i=0; i<campos_agregados.length;i++){
                if(campos_agregados.length > 0){
                    if(campos_agregados[i].id==selector)
                        index = i;
                }
                else
                    break;
            }
            if(index != undefined || index != null){
                $("#"+selector).removeClass("bg-info"); 
                $("#form_"+selector).remove();
                $("#"+selector+"_btn").removeClass("fa-minus")
                $("#"+selector+"_btn").addClass("fa-plus")
                campos_agregados.splice(index,1);
            }
            else{
                var opcion0 = "";
                var opcion1 = "";
                $("#form_body").append('<div id="form_'+selector+'"></div>');
                $("#form_"+selector).load(campos[selector]);
                $("#"+selector).addClass("bg-info"); 
                $("#"+selector+"_btn").removeClass("fa-plus");
                $("#"+selector+"_btn").addClass("fa-minus");
                if(selector == "btn_cliente"){
                    opcion0 = {value: "Sí", name: "cliente", id: "cliente-829f"};
                    opcion1 = {value: "No", name: "cliente", id: "cliente-bc94"};
                }
                else if(selector == "btn_comunicacion"){
                    opcion0 = {
                        value: "Quisiera recibir futuras comunicaciones de concursos y promociones de Movistar Plus.",
                        name: "mailing[]",
                        id: "mailing-a3d8"
                    };
                }
                campos_agregados.push({
                    id: selector,
                    tag: id.currentTarget.innerText,
                    name: selector.split("btn_")[1],
                    placeholder: "Tu respuesta",
                    html: html_types[selector][0],
                    type: html_types[selector][1],
                    required: true,
                    opciones:[opcion0, opcion1],
                })
                console.log(campos_agregados);                
            }
        });
        $("#add_dialogo").dialog({
            autoOpen: false,
            resizable: false,
            height: "auto",
            width: 400,
            modal: false,
            buttons: {
                "Agregar Campo": function(){
                    tag = $("#"+selector+"_tag").val();
                    var check = $("#"+selector+"_req")[0].checked;
                    req = (check) ? "*" : "";
                    $("#form_body").append('<div id="form_'+selector+"_"+k+'"></div>');
                    $("#form_"+selector+"_"+k).load(camposAdd[selector]);
                    $("#add_dialogo").dialog("close");
                    campos_agregados.push({
                        id: selector+"_"+k,
                        tag: tag,
                        name: selector+"_"+k,
                        placeholder: "Tu respuesta",
                        html: html_types[selector][0],
                        type: html_types[selector][1], 
                        required: check,
                        opciones:field_options,
                    });
                    console.log(campos_agregados);
                }
            },
        });
        $("#dialogo").dialog({
            autoOpen: false,
            resizable: true,
            height: "auto",
            width: "auto",
            modal: true,
            position: { my: "top left", at: "top left", of: window },
        });
        $("[id*='new_']").click((id)=>{
            field_options=[];
            k++;
            selector = id.currentTarget.id;
            $("#add_dialogo").html('<div id="add_dialogo_'+selector+'"></div>');
            $("#add_dialogo_"+selector).load(camposDial[selector]);          
            $("#add_dialogo").dialog("open");
        });
        $("#ver_formulario").click(()=>{
            $("#dialogo").html('<div id="dialogo_ver_formulario"></div>');   
            formulario = campos_agregados.map(a => {
                var r = (a.required) ? " *" : "";
                if(a.html == "textarea"){
                    return '<div class="col-xs-12"><div class="form_block"><label for="'+a.name+'">'+a.tag+r+'</label><textarea name="'+a.name+'" placeholder="'+a.placeholder+'" required="'+a.required+'"></textarea></div></div>';
                }
                else if(a.html == "select"){
                    var o='<option>Elegir una opción...</option>';
                    for(i=0;i<a.opciones.length;i++){
                        o += '<option value="'+a.opciones[i].value+'">'+a.opciones[i].value+'</option>';
                    }
                    return '<div class="col-xs-12"><div class="form_block"><label for="'+a.name+'">'+a.tag+r+'</label><select name="'+a.name+'" required="'+a.required+'">'+o+'</select></div></div>';
                }
                else if(a.html == "input"){
                    if(a.type == "radio" || a.type == "checkbox"){
                        var o='';
                        for(i=0;i<a.opciones.length;i++){
                            if(a.opciones[i].value != undefined){
                                o += '<div class="form_block_checkbox"><input type="'+a.type+'" name="'+a.opciones[i].name+'" id="'+a.opciones[i].id+'" value="'+a.opciones[i].value+'"><label for="'+a.opciones[i].id+'">'+a.opciones[i].value+'</label></div>';
                            }
                        }
                        return '<div class="col-xs-12"><div class="form_block"><p>'+a.tag+r+'</p>'+o+'</div></div>';
                    }
                    else{
                        return '<div class="col-xs-12"><div class="form_block"><label>'+a.tag+r+'</label><input name="'+a.name+'" placeholder="'+a.placeholder+'" type="'+a.type+'" required="'+a.required+'"></div></div>';
                    }
                }
            });     
            $("#dialogo_ver_formulario").load("formulario.html");
            $("#dialogo").dialog("open");
        });
    });
});