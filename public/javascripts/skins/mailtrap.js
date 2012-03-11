$(function () {
  $.errors.format ='<div class="validation-block"><div class="validation-message"></div><div class="arrow"></div></div>';
  $('.ajax-form').ajaxForm();
});
