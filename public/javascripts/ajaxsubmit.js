/**
* Ajax Submit v0.0.1
* http://github.com/bogdan/ajaxsubmit
* 
* Copyright 2011, Bogdan Gusiev
* Released under the MIT License
*/

  (function($) {
    var applyValidation, applyValidationMessage;
    if (!($().jquery >= '1.6')) throw 'ajaxsubmit.js require jQuery >= 1.6.0';
    $.errors = {
      attribute: "validate",
      activationClass: "error",
      messageClass: "validation-message",
      format: "<div class='validation'><div class='validation-message'></div><div class='arrow'></div></div>"
    };
    applyValidationMessage = function(div, message) {
      var message_div;
      if (!div.hasClass($.errors.activationClass)) {
        div.addClass($.errors.activationClass);
        message_div = div.find("." + $.errors.messageClass);
        if (message_div.size() === 0) div.append($.errors.format);
        message_div = div.find("." + $.errors.messageClass);
        if (message_div.size() > 0) {
          return message_div.html(message);
        } else {
          throw new Error("configuration error: $.errors.format must have elment with class " + $.errors.messageClass);
        }
      }
    };
    applyValidation = function(form, field, message) {
      var div;
      div = form.find("[" + $.errors.attribute + "~='" + field + "']");
      if (div.size() === 0) {
        div = $("<div " + $.errors.attribute + "='" + field + "'></div>");
        form.prepend(div);
      }
      return applyValidationMessage(div, message);
    };
    $.fn.applyErrors = function(errors) {
      var form;
      form = $(this);
      $(this).clearErrors();
      if ($.type(errors) === "object") {
        errors = $.map(errors, function(v, k) {
          return [[k, v]];
        });
      }
      return $(errors).each(function(key, error) {
        var field, message;
        field = error[0];
        message = error[1];
        if ($.isArray(message)) message = message[0];
        return applyValidation(form, field, message);
      });
    };
    return $.fn.clearErrors = function() {
      var validators;
      validators = $(this).find("[" + $.errors.attribute + "]");
      return validators.removeClass($.errors.activationClass);
    };
  })(jQuery);

  (function($) {
    var ajaxFormErrorHandler, ajaxFormSuccessHandler;
    $.fn.ajaxSubmit = function(options) {
      var $form, callback, error_callback, method, url;
      if (options == null) options = {};
      $form = $(this);
      $form.clearErrors();
      if (typeof options === "function") options.success = options;
      if (options.redirect && !options.success) {
        options.success = function() {
          return window.location = options.redirect;
        };
      }
      callback = options.success;
      error_callback = options.error;
      method = $form.attr("method") || "GET";
      url = $form.attr("action");
      return $.ajax({
        type: method.toUpperCase(),
        url: url,
        data: $form.serialize(),
        success: function(data) {
          return ajaxFormSuccessHandler($form, data, callback, error_callback);
        },
        error: function(xhr, status, str) {
          return ajaxFormErrorHandler($form);
        }
      });
    };
    ajaxFormSuccessHandler = function($form, data, callback, error_callback) {
      if ($.isEmptyObject(data && data.errors)) {
        if (typeof callback === "function") {
          return callback.call($form[0], data);
        } else if (data.redirect) {
          return window.location = data.redirect;
        }
      } else {
        if (typeof error_callback === "function") error_callback.call($form, data);
        return $form.applyErrors(data.errors);
      }
    };
    ajaxFormErrorHandler = function($form) {};
    return $.fn.ajaxForm = function(options) {
      if (options == null) options = {};
      return $(this).bind("submit", function(event) {
        event.preventDefault();
        return $(this).ajaxSubmit(options);
      });
    };
  })(jQuery);