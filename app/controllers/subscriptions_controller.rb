class SubscriptionsController < ApplicationController

  def index
    @subscriptions = Subscription.all
    @subscription = Subscription.new
  end

  def create
    @subscription = Subscription.new(params[:subscription])
  
    if @subscription.save
      flash[:notice] = 'Subscription was successfully created.'
      render :json => {:redirect => subscriptions_path}
    else
      render :json => {:errors => @subscription.errors}
    end
  end
end
