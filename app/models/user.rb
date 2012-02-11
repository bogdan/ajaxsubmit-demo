class User < ActiveRecord::Base

  authenticates_with_sorcery!
  self.sorcery_config.prevent_non_active_users_to_login = false
  attr_accessible :name, :email, :password, :providers_attributes
  
  has_many :providers, :class_name => "UserProvider", :dependent => :destroy

  default_scope :order => "users.created_at desc"
  accepts_nested_attributes_for :providers

  
  validates_format_of :email, :with => /^[A-Z0-9_\.%\+\-']+@(?:[A-Z0-9\-]+\.)+(?:[A-Z]{2,4}|museum|travel)$/i, :message => "Email is invalid"
  validates_uniqueness_of :email, :message => "Email has already been taken"
  validates_length_of :password, :minimum => 3, :message => "Password must be at least 3 characters long"
  validates_length_of :name, :minimum => 3, :message => "Name must be at least 3 characters long"


end
