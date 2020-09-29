class CreateDeckCards < ActiveRecord::Migration[6.0]
    def change
      create_table :deck_cards do |t|
        t.integer :card_id
        t.integer :deck_id
  
        t.timestamps
      end
    end
  end