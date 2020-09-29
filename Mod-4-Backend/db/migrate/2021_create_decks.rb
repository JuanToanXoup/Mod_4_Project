class CreateDecks < ActiveRecord::Migration[5.2]
    def change
      create_table :decks do |t|
        t.string :name
        t.string :colors
      end
    end
  end