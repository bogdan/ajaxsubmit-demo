$(function () {
  $.errors.format = '<div class="error-message message"><span class="bg"></span><span class="text-message"></span><a href="#" class="close-notice"><span></span></a></div>'
  $.errors.messageClass = 'text-message'
  $.errors.activationClass = 'field_with_errors'
  $('.ajax-form').ajaxForm();
  $('.close-notice').live("click", function(event) {
    event.preventDefault();
    $(this).closest(".error-message").remove();
    
  })
});
