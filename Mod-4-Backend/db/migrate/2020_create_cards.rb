class CreateCards < ActiveRecord::Migration[5.2]
    def change
      create_table :cards do |t|
        t.string :name
        t.string :mana_cost
        t.integer :multiverse_id
        t.string :image_url
        t.string :colors
        t.float :cmc
        t.integer :power
        t.integer :toughness
        t.string :cardtype
        t.string :subtypes
        t.string :rarity
        t.string :text
        t.string :legalities
        t.string :set_name
      end
    end
  end