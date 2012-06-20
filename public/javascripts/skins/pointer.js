$(function () {
  $.errors.format = '<div class="error-message">' +
    '<span class="bg"></span>' +
    '<span class="text-message validation-message"></span><a href="#" class="close-notice"><span></span></a>' +
  '</div>';
  $('.ajax-form').ajaxForm();
  $('.close-notice').live("click", function(event) {
    event.preventDefault();
    $(this).closest(".error-message").remove();
    
  })
});
