class ApplicationController < ActionController::Base
  protect_from_forgery
  
  
  helper_method :current_users_list
  helper_method :ajaxsubmit_skin
  
  protected
  
  def not_authenticated
    redirect_to root_path, :alert => "Please login first."
  end

  def ajaxsubmit_skin
    session[:ajaxsubmit_skin] || "mailtrap"
  end

  def ajaxsubmit_skin=(skin)
    session[:ajaxsubmit_skin] = skin
  end
  
  def current_users_list
    current_users.map {|u| u.email}.join(", ")
  end

end
