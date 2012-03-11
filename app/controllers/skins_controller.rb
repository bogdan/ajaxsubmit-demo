class SkinsController < ApplicationController

  def change
    self.ajaxsubmit_skin = params[:id]
    flash[:notice] = "Ajaxsubmit skin changed"
    redirect_to :back
  end
end
