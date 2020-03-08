
$(function(){
    $('#name').keyup(function(){
        $('#greet').text('Hello ' + $('#name').val())
    })
});

// $(function () {
//   $('#name').keyup(function () {
//     $('#greet').text('Hello '+$('#name').val())
//   })
// });
