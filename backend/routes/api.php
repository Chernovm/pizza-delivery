<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/pizzas', function (Request $request) {
    $products = [
        [
            'id' => 1,
            'product_type_id' => 1,
            'product_type' => [
                'id' => 1,
                'title' => "pizza"
            ],
            'title' => "Boscaiola",
            'description' => "This is a pizza that uses sausages, mushrooms and mozzarella. The use of tomatoes is optional",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/boscaiola.jpg"
        ],
        [
            'id' => 2,
            'product_type_id' => 1,
            'product_type' => [
                'id' => 1,
                'title' => "pizza"
            ],
            'title' => "Capricciosa",
            'description' => "This pizza is topped with olives, artichoke hearts, half of a boiled egg, prosciutto and mushrooms",
            'price_usd' => "5.0",
            'price_eur' => "4.25",
            'image' => "pizza/capricciosa.jpg"
        ],
        [
            'id' => 3,
            'product_type_id' => 1,
            'product_type' => [
                'id' => 1,
                'title' => "pizza"
            ],
            'title' => "Italian Tuna",
            'description' => "This tuna is packed in olive oil and is very popular as a topping, especially when using shrimp shellfish or anchovies",
            'price_usd' => "3.5",
            'price_eur' => "2.75",
            'image' => "pizza/italian-tuna.jpg"
        ],
        [
            'id' => 4,
            'product_type_id' => 1,
            'product_type' => [
                'id' => 1,
                'title' => "pizza"
            ],
            'title' => "Boscaiola",
            'description' => "This is a pizza that uses sausages, mushrooms and mozzarella. The use of tomatoes is optional",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/boscaiola.jpg"
        ],
        [
            'id' => 5,
            'product_type_id' => 1,
            'product_type' => [
                'id' => 1,
                'title' => "pizza"
            ],
            'title' => "Margherita",
            'description' => "This pizza is made with basil, mozzarella cheese and tomatoes in imitation of the colors of the Italian flag",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/margherita.jpg"
        ],
        [
            'id' => 6,
            'product_type_id' => 1,
            'product_type' => [
                'id' => 1,
                'title' => "pizza"
            ],
            'title' => "Marinara",
            'description' => "This is a traditional Neapolitan pizza that is made with lots of garlic, anchovies and oregano",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/marinara.jpg"
        ],
        [
            'id' => 7,
            'product_type_id' => 1,
            'product_type' => [
                'id' => 1,
                'title' => "pizza"
            ],
            'title' => "Napoletana",
            'description' => "This pizza is created using anchovies, mozzarella and tomatoes",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/napoletana.jpg"
        ],
        [
            'id' => 8,
            'product_type_id' => 1,
            'product_type' => [
                'id' => 1,
                'title' => "pizza"
            ],
            'title' => "Pugliese",
            'description' => "This is another great pizza that is made using olives from the area and local capers, topped with onions, mozzarella and tomatoes",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/pugliese.jpg"
        ],
        [
            'id' => 9,
            'product_type_id' => 1,
            'product_type' => [
                'id' => 1,
                'title' => "pizza"
            ],
            'title' => "Quattro Formaggi",
            'description' => "This pizza is made using a four cheese combination of mozzarella and three cheeses that are local such as parmiiano-reggiano, ricotta and Gorgonzola",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/quattro-formaggi.jpg"
        ],
        [
            'id' => 10,
            'product_type_id' => 1,
            'product_type' => [
                'id' => 1,
                'title' => "pizza"
            ],
            'title' => "Quattro Stagioni",
            'description' => "This is a pizza that uses a tomato base and is divided into four separate sectors with each one representing a season of the year",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/quattro-stagioni.jpg"
        ],
        [
            'id' => 11,
            'product_type_id' => 1,
            'product_type' => [
                'id' => 1,
                'title' => "pizza"
            ],
            'title' => "Romana",
            'description' => "This is a pizza that contains anchovies, capperi, mozzarella and tomatoes",
            'price_usd' => "5.5",
            'price_eur' => "4.75",
            'image' => "pizza/alla-romana.jpg"
        ],
        [
            'id' => 11,
            'product_type_id' => 1,
            'product_type' => [
                'id' => 1,
                'title' => "pizza"
            ],
            'title' => "Rucola Stracchino",
            'description' => "This pizza is topped with arugula and cherry tomatoes",
            'price_usd' => "4.5",
            'price_eur' => "3.75",
            'image' => "pizza/rucola-stracchino.jpg"
        ]
    ];

    return response()
        ->json($products)
        ->header('Content-Type', 'application/json; charset=UTF-8')
        ->header('Cache-Control', 'no-store, no-cache, must-revalidate')
        ->header('Pragma', 'no-cache');
});

Route::get('/beverages', function (Request $request) {
    $products = [
        [
            'id' => 12,
            'product_type_id' => 2,
            'product_type' => [
                'id' => 2,
                'title' => "beverage"
            ],
            'title' => "Coke",
            'description' => "Taste the Feeling",
            'price_usd' => "2.5",
            'price_eur' => "1.75",
            'image' => "beverage/coke.jpg"
        ],
        [
            'id' => 13,
            'product_type_id' => 1,
            'product_type' => [
                'id' => 2,
                'title' => "beverage"
            ],
            'title' => "Orange Juice",
            'description' => "Simply Orange",
            'price_usd' => "2.0",
            'price_eur' => "1.5",
            'image' => "beverage/orange-juice.jpg"
        ]
    ];

    return response()
        ->json($products)
        ->header('Content-Type', 'application/json; charset=UTF-8')
        ->header('Cache-Control', 'no-store, no-cache, must-revalidate')
        ->header('Pragma', 'no-cache');
});
