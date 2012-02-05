class UserSessionsController < ApplicationController
  skip_before_filter :require_login, :except => [:destroy]
  
  def new
    @user = User.new
  end
  
  def create
    if @user = login(params[:email],params[:password],params[:remember])
      render :json => {:redirect => users_path}
    else
      render :json => {:errors => {:base => "Login failed"}}
    end
  end
  
  def destroy
    logout
    redirect_to(:users, :notice => 'Logged out!')
  end

end
