<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->decimal('sum_usd', 8, 2);
            $table->decimal('sum_eur', 8, 2);
            $table->unsignedBigInteger('user_id')->nullable();
            $table->decimal('delivery_price_usd', 8, 2);
            $table->decimal('delivery_price_eur', 8, 2);
            $table->text('address');
            $table->text('client_name');
            $table->string('phone', 16);
            $table->timestamps();
        });

        Schema::create('order_positions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('quantity');
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('product_id');
            $table->decimal('price_usd', 8, 2);
            $table->decimal('price_eur', 8, 2);
            $table->timestamps();

            $table->foreign('order_id')->references('id')->on('orders');
            $table->foreign('product_id')->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_positions');
        Schema::dropIfExists('orders');
    }
}
