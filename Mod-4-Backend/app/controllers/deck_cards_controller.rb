class DeckCardsController < ApplicationController

    def index
        deck_cards = DeckCard.all
        render json: deck_cards
    end

    def create
        deck_card = DeckCard.new(deck_card_params)
        deck_card.save
        render json: deck_card.card
    end
    
    private
    def find_deck_card
        deck = Deck.find(params[:id])
    end

    def deck_card_params
        params.require(:deck_card).permit(:deck_id,:card_id)
    end
end