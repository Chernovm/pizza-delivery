<?php

use Illuminate\Database\Seeder;

class ProductTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('product_types')->insert([
            'title' => "pizza"
        ]);

        DB::table('product_types')->insert([
            'title' => "beverage"
        ]);
    }
}
