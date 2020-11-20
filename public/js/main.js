$('#myModal').on('shown.bs.modal', function() {
    $('#myInput').focus()
})

//I don't realyl understadn this jQuery and it's getting too late, I might come back to this
/*
$('#save').click(function() {
    $('#someModalId').modal('hide');
    $(document).ready(function() {
        $.ajax({
            method: "POST",
            url: "/articles/new",
            data: {
                num: num,
                text: $("#message-text").val()
            }
        })

    })
})
*/