class DecksController < ApplicationController

    def index
        decks = Deck.all
        render json: decks, include: [:cards]
    end
    
    # def create
    #     @user = User.new(user_params)
    #     if @user.valid?
    #         @rand = rand(16)
    #         @user.avatar.attach(io: File.open("app/assets/images/avatars/#{@rand}.png"),filename: "#{@rand}.png", content_type: 'image/png')
    #         @user.save
    #         flash[:error] = "Welcome! Please sign in with your new Username and Password."
    #         redirect_to login_path
    #     else
    #         flash[:error] = @user.errors.messages
    #         redirect_to sign_up_path
    #     end
    # end

    def show
        render json: find_deck, include: [:cards]
    end

    def edit
        find_deck
    end

    def update
        find_deck
        user.update(deck_params)
        render json: deck, include: [:cards]
    end

    def destroy
    end

    private 
    def find_deck
        deck = Deck.find(params[:id])
    end

    def deck_params
        params.require(:deck).permit(:name,:colors)
    end
end