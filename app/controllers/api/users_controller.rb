# class Api::UsersController < ApplicationController

#     def create
#         @user = Api::User.new(user_params)
#         if @user.save
#           login!(@user)
#           render :show
#         else 
          
#           render json: @user.errors.full_messages, status: 402
#         end
#       end
    
#       def user_params
#         params.require(:user).permit(:username, :email, :password)
#       end
#     end
# end