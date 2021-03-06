class DeckCardsController < ApplicationController

    def index
        deck_cards = DeckCard.all
        render json: deck_cards
    end

    def create
        deck_card = DeckCard.new(deck_card_params)
        deck_card.save
        render json: {deck_card: deck_card, card: deck_card.card}
    end

    def destroy
        delete_card = find_deck_card
        delete_card.destroy
        render json: delete_card
    end
    
    private
    def find_deck_card
        deck = DeckCard.find(params[:id])
    end

    def deck_card_params
        params.require(:deck_card).permit(:deck_id,:card_id)
    end
end