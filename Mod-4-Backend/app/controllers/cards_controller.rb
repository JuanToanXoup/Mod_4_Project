class CardsController < ApplicationController
    def index
        cards = Card.all
        render json: cards
    end

    def standard 
        cards = Card.all.filter{|card| card.legalities.include?('Penny')}
    end

    
  end


