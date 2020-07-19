<?php

use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /* Pizzas */
        DB::table('products')->insert([
            'product_type_id' => 1,
            'title' => "Boscaiola",
            'description' => "This is a pizza that uses sausages, mushrooms and mozzarella. The use of tomatoes is optional",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/boscaiola.jpg"
        ]);

        DB::table('products')->insert([
            'product_type_id' => 1,
            'title' => "Capricciosa",
            'description' => "This pizza is topped with olives, artichoke hearts, half of a boiled egg, prosciutto and mushrooms",
            'price_usd' => "5.0",
            'price_eur' => "4.25",
            'image' => "pizza/capricciosa.jpg"
        ]);

        DB::table('products')->insert([
            'product_type_id' => 1,
            'title' => "Italian Tuna",
            'description' => "This tuna is packed in olive oil and is very popular as a topping, especially when using shrimp shellfish or anchovies",
            'price_usd' => "3.5",
            'price_eur' => "2.75",
            'image' => "pizza/italian-tuna.jpg"
        ]);

        DB::table('products')->insert([
            'product_type_id' => 1,
            'title' => "Rucola Stracchino",
            'description' => "This pizza is topped with arugula and cherry tomatoes",
            'price_usd' => "4.5",
            'price_eur' => "3.75",
            'image' => "pizza/rucola-stracchino.jpg"
        ]);

        DB::table('products')->insert([
            'product_type_id' => 1,
            'title' => "Margherita",
            'description' => "This pizza is made with basil, mozzarella cheese and tomatoes in imitation of the colors of the Italian flag",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/margherita.jpg"
        ]);

        DB::table('products')->insert([
            'product_type_id' => 1,
            'title' => "Marinara",
            'description' => "This is a traditional Neapolitan pizza that is made with lots of garlic, anchovies and oregano",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/marinara.jpg"
        ]);

        DB::table('products')->insert([
            'product_type_id' => 1,
            'title' => "Napoletana",
            'description' => "This pizza is created using anchovies, mozzarella and tomatoes",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/napoletana.jpg"
        ]);

        DB::table('products')->insert([
            'product_type_id' => 1,
            'title' => "Pugliese",
            'description' => "This is another great pizza that is made using olives from the area and local capers, topped with onions, mozzarella and tomatoes",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/pugliese.jpg"
        ]);

        DB::table('products')->insert([
            'product_type_id' => 1,
            'title' => "Quattro Formaggi",
            'description' => "This pizza is made using a four cheese combination of mozzarella and three cheeses that are local such as parmiiano-reggiano, ricotta and Gorgonzola",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/quattro-formaggi.jpg"
        ]);

        DB::table('products')->insert([
            'product_type_id' => 1,
            'title' => "Quattro Stagioni",
            'description' => "This is a pizza that uses a tomato base and is divided into four separate sectors with each one representing a season of the year",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/quattro-stagioni.jpg"
        ]);

        DB::table('products')->insert([
            'product_type_id' => 1,
            'title' => "Romana",
            'description' => "This is a pizza that contains anchovies, capperi, mozzarella and tomatoes",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/alla-romana.jpg"
        ]);

        /* Beverages */

        DB::table('products')->insert([
            'product_type_id' => 2,
            'title' => "Coke",
            'description' => "Taste the Feeling",
            'price_usd' => "2.5",
            'price_eur' => "1.75",
            'image' => "beverage/coke.jpg"
        ]);

        DB::table('products')->insert([
            'product_type_id' => 2,
            'title' => "Orange Juice",
            'description' => "Simply Orange",
            'price_usd' => "2.0",
            'price_eur' => "1.5",
            'image' => "beverage/orange-juice.jpg"
        ]);
    }
}
