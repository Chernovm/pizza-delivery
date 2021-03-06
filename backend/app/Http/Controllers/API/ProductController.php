<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $productType = $request->get('type') ?? null;
        $productsQuery = Product::with('productType')->orderBy('title');

        if ($productType !== null) {
            $productsQuery->where('product_type_id', function($q) use ($productType)
            {
                $q->from('product_types')
                    ->selectRaw('id')
                    ->where('title', $productType);
            });
        }

        $products = $productsQuery->get();

        return response()
            ->json($products)
            ->header('Content-Type', 'application/json; charset=UTF-8')
            ->header('Cache-Control', 'no-store, no-cache, must-revalidate')
            ->header('Pragma', 'no-cache');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $product = Product::where('id', $id)->first();

        if ($product === null) {
            return response()->json([
                    'message' => 'Not Found',
                ], 404)
                ->header('Content-Type', 'application/json; charset=UTF-8')
                ->header('Cache-Control', 'no-store, no-cache, must-revalidate')
                ->header('Pragma', 'no-cache');
        }

        return response()
            ->json($product)
            ->header('Content-Type', 'application/json; charset=UTF-8')
            ->header('Cache-Control', 'no-store, no-cache, must-revalidate')
            ->header('Pragma', 'no-cache');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}
