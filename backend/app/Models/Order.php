<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'orders';

    protected $fillable = [
        'value_total',
        'user_id',
    ];

    function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    function product(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'orders_products');
    }
}
