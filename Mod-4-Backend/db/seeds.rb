Card.destroy_all
Deck.destroy_all

50.times do |index| 
    getCards = MTG::Card.where(page: index).where(pageSize: 50).all
    cards = getCards.filter{|card| card.multiverse_id != nil}
    cards.map do |card|
        if !(Card.all.map{|old_card| old_card.multiverse_id}.include?(card.multiverse_id))
            Card.create({
                name: card.name,
                mana_cost: card.mana_cost, 
                multiverse_id: card.multiverse_id,
                image_url: card.image_url,
                colors: card.colors.join(','),
                cmc: card.cmc,
                power: cards.first.power,
                toughness: cards.first.toughness,
                cardtype: card.type,
                subtypes: card.subtypes.join(','),
                rarity: card.rarity,
                text: card.text,
                legalities: card.legalities.map{|format| format.format}.join(','),
                set_name: card.set_name,
                price: rand(0.01..20).round(2)
            })
        end
    end
end

Deck.create({name: 'Rouges', colors: 'Blue, Black'})
Deck.create({name: 'Humans', colors: 'White, Black'})
Deck.create({name: 'Mono White Weenies', colors: 'White'})
Deck.create({name: 'Mono Red', colors: 'Red'})
Deck.create({name: 'Mono Green Stompy', colors: 'Green'})
Deck.create({name: 'Blue White Control', colors: 'Blue, White'})
Deck.create({name: 'Mardu', colors: 'Red, Black, White'})
Deck.create({name: 'Simic Flash', colors: 'Blue, Green'})