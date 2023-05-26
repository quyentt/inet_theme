$(document).on('click', '.add_to_cart', function(e) {
    $('#popupCartModal').css("display", "block");
    $("body").append("<div class='modal-backdrop show'></div>");
});
$(document).on('click', '#popupCartModal .close', function(e) {
    $('#popupCartModal').css("display", "none");
    $(".modal-backdrop.show").remove();
});
$('#popupCartModal').on('click', function(event) {
    if (!$(event.target).closest('.modal-content ').length) {
        $('#popupCartModal').css("display", "none");
        $(".modal-backdrop.show").remove();
    }
})