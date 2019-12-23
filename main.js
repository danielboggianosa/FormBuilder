var campos={
    btn_nombre:'fields/nombre.html',
    btn_ap_paterno:'fields/paterno.html',
    btn_ap_materno:'fields/materno.html',
    btn_dni:'fields/dni.html',
    btn_telefono:'fields/telefono.html',
    btn_correo:'fields/correo.html',
    btn_cliente:'fields/cliente.html',
    btn_comunicacion:'fields/comunicacion.html',
};
var camposAdd={
    add_text:'fields/text.html',
    add_textarea:'',
    add_number:'',
    add_image:'',
    add_fecha:'',
    add_archivo:'',
    add_opcionU:'',
    add_opcionM:'',
    add_lista:'',
};
var camposDial={
    add_text:'dialogos/text.html',
    add_textarea:'',
    add_number:'',
    add_image:'',
    add_fecha:'',
    add_archivo:'',
    add_opcionU:'',
    add_opcionM:'',
    add_lista:'',
};
var campos_agregados=[];
$(document).ready(function(){
    $("#FormBuilderDB").load("view.html", ()=>{        
        $("[id*='btn_']").click((id)=>{
            var selector = id.currentTarget.id;
            if(campos_agregados.indexOf(selector) >= 0){
                let index = campos_agregados.indexOf(selector);
                $("#"+selector).removeClass("bg-info"); 
                $("#form_"+selector).remove();
                campos_agregados.splice(index,1);
                $("#"+selector+"_btn").removeClass("fa-minus")
                $("#"+selector+"_btn").addClass("fa-plus")
            }
            else{
                console.log(id);
                $("#form_body").append('<div id="form_'+selector+'"></div>');
                $("#form_"+selector).load(campos[selector]);
                $("#"+selector).addClass("bg-info"); 
                campos_agregados.push(selector);
                $("#"+selector+"_btn").removeClass("fa-plus")
                $("#"+selector+"_btn").addClass("fa-minus")
            }
        });
        $("[id*='add_']").click((id)=>{
            var selector = id.currentTarget.id;
            var titulo = id.delegateTarget.innerText;
            $("#add_dialogo").html('<div id="add_dialogo_'+selector+'" title="'+titulo+'"></div>');
            $("#add_dialogo_"+selector).dialog({
                resizable: false,
                close: false,
                height: "auto",
                width: 400,
                modal: false,
                buttons: {
                  "Agregar Campo": function() {
                        var req = ($("#required")[0].checked) ? "*" : "";
                        $("#form_body").append('<div id="form_'+selector+'"></div>');
                        $("#form_"+selector).html(`
                        <div class="card">
                            <div class="card-header">`+$("#tag").val()+` `+req+`</div>
                            <div class="card-body">
                                <input type="text" class="form-control" placeholder="Tu Respuesta" disabled>
                            </div>
                        </div>`);
                        $( this ).dialog( "close" );
                        $( this ).remove();
                  },
                }
              });
            $("#add_dialogo_"+selector).load(camposDial[selector]);            
        })
    });
})