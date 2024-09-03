export const beverages = [
    // Iced Energy
    {
        name: "Tropical Citrus Iced Coffee",
        price: {
            small: 2.8,
            medium: 3.3,
            large: 3.8,
        },
        description: "A refreshing iced coffee with a tropical citrus twist.",
        calories: {
            small: 90,
            medium: 120,
            large: 150,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Electric Elixirs"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/TropicalCitrusEnergyDrink.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Melon Burst Iced Coffee",
        price: {
            small: 2.9,
            medium: 3.4,
            large: 3.9,
        },
        description: "Iced coffee infused with a burst of melon flavor.",
        calories: {
            small: 100,
            medium: 130,
            large: 160,
        },
        isPopular: false,
        isFeatured: false,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Electric Elixirs"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/MelonBurstEnergyDrink.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Frozen Tropical Citrus Iced Energy with Strawberry Puree",
        price: {
            small: 3.0,
            medium: 3.5,
            large: 4.0,
        },
        description: "A frozen iced energy drink with a tropical citrus flavor and strawberry puree.",
        calories: {
            small: 110,
            medium: 140,
            large: 180,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Electric Elixirs"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/FrozenTropicalCitrusStrawberryEnergyDrink.jpg?impolicy=1by1_wide_topcrop_630",
    },
  
    // Hot Coffees: Americanos
    {
        name: "Caffè Americano",
        price: {
            small: 2.5,
            medium: 3.0,
            large: 3.5,
        },
        description: "A bold, rich espresso combined with hot water.",
        calories: {
            small: 10,
            medium: 15,
            large: 20,
        },
        isPopular: true,
        isFeatured: false,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeAmericano.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Vendara Blend",
        price: {
            small: 2.6,
            medium: 3.1,
            large: 3.6,
        },
        description: "A smooth blend with a hint of sweetness and spice.",
        calories: {
            small: 15,
            medium: 20,
            large: 25,
        },
        isPopular: false,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/Veranda_Blend_Hot.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Featured Medium Roast - Pike Place® Roast",
        price: {
            small: 2.7,
            medium: 3.2,
            large: 3.7,
        },
        description: "Smooth and well-balanced, with rich flavor and subtle notes of cocoa.",
        calories: {
            small: 20,
            medium: 25,
            large: 30,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_PikePlaceRoast.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Featured Dark Roast",
        price: {
            small: 2.8,
            medium: 3.3,
            large: 3.8,
        },
        description: "A bold dark roast with a robust, smoky flavor.",
        calories: {
            small: 25,
            medium: 30,
            large: 35,
        },
        isPopular: false,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_FeaturedDarkRoast.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Decaf Pike Place® Roast",
        price: {
            small: 2.7,
            medium: 3.2,
            large: 3.7,
        },
        description: "The same rich and well-balanced flavor as our Pike Place® Roast, but without the caffeine.",
        calories: {
            small: 20,
            medium: 25,
            large: 30,
        },
        isPopular: false,
        isFeatured: false,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_DecafPikePlaceRoast.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Veranda Blend® Clover Vertica™",
        price: {
            small: 3.0,
            medium: 3.5,
            large: 4.0,
        },
        description: "A mellow and soft coffee with notes of toasted nuts and chocolate.",
        calories: {
            small: 20,
            medium: 25,
            large: 30,
        },
        isPopular: true,
        isFeatured: false,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_BlondeRoast.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Caffè Misto",
        price: {
            small: 2.9,
            medium: 3.4,
            large: 3.9,
        },
        description: "A smooth blend of brewed coffee and steamed milk.",
        calories: {
            small: 40,
            medium: 50,
            large: 60,
        },
        isPopular: false,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeMisto.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Guatemala Casi Cielo® Clover Vertica™",
        price: {
            small: 3.1,
            medium: 3.6,
            large: 4.1,
        },
        description: "A distinctive coffee with a bright acidity and floral notes.",
        calories: {
            small: 20,
            medium: 25,
            large: 30,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/PikePlaceRoast.jpg?impolicy=1by1_wide_topcrop_630",
    },
  
    // Cappuccinos
    {
        name: "Cappuccino",
        price: {
            small: 3.0,
            medium: 3.5,
            large: 4.0,
        },
        description: "Rich espresso with steamed milk, topped with a deep layer of foam.",
        calories: {
            small: 80,
            medium: 100,
            large: 120,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_Cappuccino.jpg?impolicy=1by1_wide_topcrop_630",
    },
  
    // Espresso Shots
    {
        name: "Espresso",
        price: {
            single: 2.0,
            double: 2.5,
        },
        description: "A shot of rich espresso, full of depth and flavor.",
        calories: {
            single: 5,
            double: 10,
        },
        isPopular: true,
        isFeatured: false,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_Espresso_Single.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Espresso Con Panna",
        price: {
            single: 2.1,
            double: 2.6,
        },
        description: "A shot of rich espresso topped with a dollop of whipped cream.",
        calories: {
            single: 10,
            double: 15,
        },
        isPopular: false,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_EspressoConPanna.jpg?impolicy=1by1_wide_topcrop_630",
    },
  
    // Flat Whites
    {
        name: "Honey Almondmilk Flat White",
        price: {
            small: 3.7,
            medium: 4.2,
            large: 4.7,
        },
        description: "A velvety flat white made with almond milk and a hint of honey.",
        calories: {
            small: 100,
            medium: 130,
            large: 160,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20230406_HoneyAlmondmilkFlatWhite.jpg?impolicy=1by1_wide_topcrop_630",
    },
  
    // Lattes
    {
        name: "Pumpkin Spice Latte",
        price: {
            small: 4.0,
            medium: 4.5,
            large: 5.0,
        },
        description: "Espresso and steamed milk with pumpkin, cinnamon, nutmeg, and clove flavors.",
        calories: {
            small: 300,
            medium: 380,
            large: 450,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/PumpkinSpiceLatte.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Oleato™ Caffé Latte with Oatmilk",
        price: {
            small: 4.2,
            medium: 4.7,
            large: 5.2,
        },
        description: "A smooth latte made with oat milk and a hint of olive oil.",
        calories: {
            small: 220,
            medium: 270,
            large: 320,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/Oleato_CaffeLatte.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Caffè Latte",
        price: {
            small: 3.5,
            medium: 4.0,
            large: 4.5,
        },
        description: "Rich espresso and steamed milk topped with a light layer of foam.",
        calories: {
            small: 180,
            medium: 230,
            large: 290,
        },
        isPopular: true,
        isFeatured: false,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeLatte.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Cinnamon Dolce Latte",
        price: {
            small: 4.0,
            medium: 4.5,
            large: 5.0,
        },
        description: "Espresso, steamed milk, and cinnamon dolce syrup topped with sweetened whipped cream.",
        calories: {
            small: 330,
            medium: 410,
            large: 490,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CinnamonDolceLatte.jpg?impolicy=1by1_wide_topcrop_630",
    },
  
    // Macchiatos
    {
        name: "Apple Crisp Oatmilk Macchiato",
        price: {
            small: 4.5,
            medium: 5.0,
            large: 5.5,
        },
        description: "Espresso layered with steamed oatmilk, apple, and brown sugar flavors.",
        calories: {
            small: 230,
            medium: 300,
            large: 380,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/AppleCrispOatmilkMacchiato.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Caramel Macchiato",
        price: {
            small: 4.2,
            medium: 4.7,
            large: 5.2,
        },
        description: "Freshly steamed milk with vanilla-flavored syrup, marked with espresso and topped with caramel drizzle.",
        calories: {
            small: 250,
            medium: 320,
            large: 420,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211029_CaramelMacchiato.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Espresso Macchiato",
        price: {
            single: 2.5,
            double: 3.0,
        },
        description: "A rich shot of espresso topped with a dollop of steamed milk foam.",
        calories: {
            single: 15,
            double: 20,
        },
        isPopular: false,
        isFeatured: false,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_EspressoMacchiato.jpg?impolicy=1by1_wide_topcrop_630",
    },
  
    // Mochas
    {
        name: "Caffè Mocha",
        price: {
            small: 4.0,
            medium: 4.5,
            large: 5.0,
        },
        description: "Espresso, steamed milk, and rich mocha sauce topped with whipped cream.",
        calories: {
            small: 290,
            medium: 360,
            large: 440,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20220607_CaffeMocha.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "White Chocolate Mocha",
        price: {
            small: 4.2,
            medium: 4.7,
            large: 5.2,
        },
        description: "Espresso, steamed milk, and white chocolate-flavored sauce topped with whipped cream.",
        calories: {
            small: 350,
            medium: 430,
            large: 510,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Brewed Brilliance"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_WhiteChocolateMocha.jpg?impolicy=1by1_wide_topcrop_630",
    },
  
    // Cold Coffees: Cold Brews
    {
        name: "Pumpkin Cream Cold Brew",
        price: {
            small: 4.3,
            medium: 4.8,
            large: 5.3,
        },
        description: "Cold brew topped with pumpkin cream cold foam and a dusting of pumpkin spice.",
        calories: {
            small: 250,
            medium: 320,
            large: 390,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Chill-Out Classics"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/PumpkinCreamColdBrew.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Salted Caramel Cream Cold Brew",
        price: {
            small: 4.2,
            medium: 4.7,
            large: 5.2,
        },
        description: "Cold brew topped with salted caramel cold foam.",
        calories: {
            small: 230,
            medium: 290,
            large: 350,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Chill-Out Classics"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211029_SaltedCaramelCreamColdBrew.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Chocolate Cream Cold Brew",
        price: {
            small: 4.5,
            medium: 5.0,
            large: 5.5,
        },
        description: "Cold brew topped with chocolate cream cold foam.",
        calories: {
            small: 260,
            medium: 330,
            large: 400,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Chill-Out Classics"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211217_ChocolateCreamColdBrew.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Starbucks Cold Brew Coffee",
        price: {
            small: 3.8,
            medium: 4.3,
            large: 4.8,
        },
        description: "Smooth, rich cold brew coffee.",
        calories: {
            small: 5,
            medium: 10,
            large: 15,
        },
        isPopular: true,
        isFeatured: false,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Chill-Out Classics"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20210611_ColdBrew.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Vanilla Sweet Cream Cold Brew",
        price: {
            small: 4.0,
            medium: 4.5,
            large: 5.0,
        },
        description: "Cold brew topped with vanilla sweet cream.",
        calories: {
            small: 110,
            medium: 150,
            large: 190,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Chill-Out Classics"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190607_VanillaSweetCreamColdBrew.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Nondairy Salted Caramel Cream Cold Brew",
        price: {
            small: 4.5,
            medium: 5.0,
            large: 5.5,
        },
        description: "Cold brew topped with nondairy salted caramel cold foam.",
        calories: {
            small: 240,
            medium: 300,
            large: 360,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Chill-Out Classics"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/NonDairySaltedCaramelColdBrewColdFoam.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Nondairy Vanilla Sweet Cream Cold Brew",
        price: {
            small: 4.5,
            medium: 5.0,
            large: 5.5,
        },
        description: "Cold brew topped with nondairy vanilla sweet cream.",
        calories: {
            small: 120,
            medium: 160,
            large: 200,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Chill-Out Classics"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/NonDairyVanillaSweetCreamColdBrew.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Cold Brew with Nondairy Vanilla Sweet Cream Cold Foam",
        price: {
            small: 4.6,
            medium: 5.1,
            large: 5.6,
        },
        description: "Cold brew topped with nondairy vanilla sweet cream cold foam.",
        calories: {
            small: 130,
            medium: 170,
            large: 210,
        },
        isPopular: false,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Chill-Out Classics"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/NonDairyVanillaSweetCreamColdFoam.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Nondairy Chocolate Cream Cold Brew",
        price: {
            small: 4.6,
            medium: 5.1,
            large: 5.6,
        },
        description: "Cold brew topped with nondairy chocolate cream cold foam.",
        calories: {
            small: 270,
            medium: 340,
            large: 410,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Chill-Out Classics"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/NonDairyChocolateCreamColdBrew.jpg?impolicy=1by1_wide_topcrop_630",
    },
  
    // Nitro Cold Brews
    {
        name: "Vanilla Sweet Cream Nitro Cold Brew",
        price: {
            small: 4.8,
            medium: 5.3,
            large: 5.8,
        },
        description: "Nitro cold brew topped with vanilla sweet cream.",
        calories: {
            small: 130,
            medium: 180,
            large: 230,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Chill-Out Classics"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190410_VanillaSweetCreamNitroColdBrew.jpg?impolicy=1by1_wide_topcrop_630",
    },
    {
        name: "Nitro Cold Brew",
        price: {
            small: 4.0,
            medium: 4.5,
            large: 5.0,
        },
        description: "Smooth, creamy nitro cold brew.",
        calories: {
            small: 5,
            medium: 10,
            large: 15,
        },
        isPopular: true,
        isFeatured: true,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Chill-Out Classics"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190410_NitroColdBrew.jpg?impolicy=1by1_wide_topcrop_630",
    },
  
    // Iced Americano
    {
        name: "Iced Caffè Americano",
        price: {
            small: 2.8,
            medium: 3.3,
            large: 3.8,
        },
        description: "Espresso shots topped with cold water, poured over ice.",
        calories: {
            small: 10,
            medium: 15,
            large: 20,
        },
        isPopular: true,
        isFeatured: false,
        size: null,
        addOns: {
            extraSugar: null,
        },
        category: ["Chill-Out Classics"],
        image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190607_IcedCaffeAmericano.jpg?impolicy=1by1_wide_topcrop_630",
    },
];  

export const foods = [
  {
    name: "Classic Croissant",
    price: 2.5,
    description: "A buttery, flaky pastry, perfect for breakfast or a snack.",
    calories: 300,
    isPopular: true,
    isFeatured: false,
    category: ["Bakery"],
  },
  {
    name: "Turkey & Cheese Sandwich",
    price: 5.5,
    description:
      "A delicious turkey sandwich with fresh lettuce, tomatoes, and cheese.",
    calories: 450,
    isPopular: true,
    isFeatured: true,
    category: ["Lunch"],
  },
  {
    name: "Blueberry Muffin",
    price: 3.0,
    description:
      "A moist muffin packed with blueberries, ideal for a quick bite.",
    calories: 350,
    isPopular: false,
    isFeatured: false,
    category: ["Bakery", "Snacks & Sweets"],
  },
  {
    name: "Oatmeal with Fresh Berries",
    price: 4.0,
    description: "Warm oatmeal served with fresh seasonal berries.",
    calories: 220,
    isPopular: true,
    isFeatured: true,
    category: ["Oatmeal & Yogurt", "Hot Breakfast"],
  },
  {
    name: "Bacon & Egg Breakfast Sandwich",
    price: 4.5,
    description:
      "A hearty sandwich with crispy bacon, a fried egg, and melted cheese on a soft roll.",
    calories: 480,
    isPopular: true,
    isFeatured: true,
    category: ["Hot Breakfast"],
  },
  {
    name: "Greek Yogurt Parfait",
    price: 3.5,
    description: "Creamy Greek yogurt layered with granola and fresh fruit.",
    calories: 180,
    isPopular: true,
    isFeatured: false,
    category: ["Oatmeal & Yogurt"],
  },
  {
    name: "Caesar Salad",
    price: 6.0,
    description:
      "Crisp romaine lettuce, parmesan cheese, and croutons with Caesar dressing.",
    calories: 350,
    isPopular: false,
    isFeatured: true,
    category: ["Lunch"],
  },
  {
    name: "Chocolate Chip Cookie",
    price: 2.0,
    description:
      "A classic chocolate chip cookie with a chewy center and crispy edges.",
    calories: 250,
    isPopular: true,
    isFeatured: false,
    category: ["Snacks & Sweets"],
  },
  {
    name: "Quinoa & Avocado Salad",
    price: 7.0,
    description:
      "A healthy salad with quinoa, avocado, cherry tomatoes, and a lemon vinaigrette.",
    calories: 320,
    isPopular: false,
    isFeatured: true,
    category: ["Lunch", "Healthy Options"],
  },
];
