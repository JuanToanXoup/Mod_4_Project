# Card.destroy_all
# # Decks.destroy_all

# 50.times do |index| 
#     getCards = MTG::Card.where(page: index).where(pageSize: 50).all
#     cards = getCards.filter{|card| card.multiverse_id != nil}
#     cards.map do |card|
#         if !(Card.all.map{|old_card| old_card.multiverse_id}.include?(card.multiverse_id))
#             Card.create({
#                 name: card.name,
#                 mana_cost: card.mana_cost, 
#                 multiverse_id: card.multiverse_id,
#                 image_url: card.image_url,
#                 colors: card.colors.join(','),
#                 cmc: card.cmc,
#                 power: cards.first.power,
#                 toughness: cards.first.toughness,
#                 cardtype: card.type,
#                 subtypes: card.subtypes.join(','),
#                 rarity: card.rarity,
#                 text: card.text,
#                 legalities: card.legalities.map{|format| format.format}.join(','),
#                 set_name: card.set_name
#             })
#         end
#     end
# end

# Deck.create({name: 'Deck 1', colors: 'white'})
# Deck.create({name: 'Deck 2', colors: 'blue'})
# Deck.create({name: 'Deck 3', colors: 'green'})
# Deck.create({name: 'Deck 4', colors: 'black'})
# Deck.create({name: 'Deck 5', colors: 'red'})
# Deck.create({name: 'Deck 6', colors: 'blue,black'})
# Deck.create({name: 'Deck 7', colors: 'red,black'})
# Deck.create({name: 'Deck 8', colors: 'white,black'})

DeckCard.create(card_id: 1,deck_id: 1)