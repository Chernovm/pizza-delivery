<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public function positions() {
        return $this->hasMany('App\OrderPosition');
    }

    public static function createOrder($payload) {
        $result = false;

        \DB::transaction(function () use ($payload, &$result) {
            $name = $payload['name'];
            $address = $payload['address'];
            $phone = $payload['phone'];

            $products = $payload['products'];
            $delivery = $payload['delivery'];

            $productIds = collect($products)->pluck('productId')->values();
            $productModels = Product::whereIn('id', $productIds)->get()->keyBy('id');

            $sumUsd = 0;
            $sumEur = 0;

            foreach ($products as $productDetails) {
                $productId = $productDetails['productId'];
                $quantity = $productDetails['count'];
                $productModel = $productModels[$productId];

                $sumUsd += $quantity * $productModel->price_usd;
                $sumEur += $quantity * $productModel->price_eur;
            }

            $order = new self();

            $order->address = $address;
            $order->client_name = $name;
            $order->phone = $phone;

            $order->sum_usd = $sumUsd;
            $order->sum_eur = $sumEur;

            $order->delivery_price_usd = $delivery['usd'];
            $order->delivery_price_eur = $delivery['eur'];

            if ($order->save()) {
                $order = $order->fresh();

                foreach ($products as $productDetails) {
                    $productId = $productDetails['productId'];
                    $quantity = $productDetails['count'];
                    $productModel = $productModels[$productId];

                    $orderPosition = new OrderPosition();

                    $orderPosition->quantity = $quantity;
                    $orderPosition->order_id = $order->id;
                    $orderPosition->product_id = $productId;

                    $orderPosition->price_usd = $productModel->price_usd;
                    $orderPosition->price_eur = $productModel->price_eur;

                    if (!$orderPosition->save()) {
                        return false;
                    }
                }
            } else {
                return false;
            }

            $result = $order->id;
            return true;
        }, 5);
    }
}
