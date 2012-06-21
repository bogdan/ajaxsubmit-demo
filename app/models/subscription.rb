class Subscription < ActiveRecord::Base

  validates_format_of :email, :with => /^[A-Z0-9_\.%\+\-']+@(?:[A-Z0-9\-]+\.)+(?:[A-Z]{2,4}|museum|travel)$/i, :message => "Email is invalid"
  validates_uniqueness_of :email, :message => "Email has already been taken"
  validates_presence_of :first_name, :message => "First name is blank"
  validates_presence_of :last_name, :message => "Last name is blank"

end
