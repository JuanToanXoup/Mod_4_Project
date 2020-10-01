class DecksController < ApplicationController

    def index
        decks = Deck.all
        render json: decks, include: [:deck_cards ]
    end
    
    # def create
    #     @user = User.new(user_params)
    #      @user.save
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