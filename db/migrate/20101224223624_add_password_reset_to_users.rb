class AddPasswordResetToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :reset_password_code, :string, :default => nil
    add_column :users, :reset_password_code_expires_at, :datetime, :default => nil
    add_column :users, :reset_password_email_sent_at, :datetime, :default => nil
  end

  def self.down
    remove_column :users, :reset_password_email_sent_at
    remove_column :users, :reset_password_code_expires_at
    remove_column :users, :reset_password_code
  end
end