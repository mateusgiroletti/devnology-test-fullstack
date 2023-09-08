<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'products';

    protected $fillable = [
        'name',
        'value',
        'discount_value',
    ];

    function product(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'orders_products', 'product_id', 'order_id');
    }
}
