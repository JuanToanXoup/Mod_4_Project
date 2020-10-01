class CardsController < ApplicationController
    def index
        cards = Card.all
        render json: cards
    end

    def show
        card = find_card
        render json: card
    end
    def standard 
        cards = Card.all.filter{|card| card.legalities.include?('Penny')}
    end

    private 
    def find_card
        deck = Card.find(params[:id])
    end
    
  end


