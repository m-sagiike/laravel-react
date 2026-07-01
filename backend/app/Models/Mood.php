<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mood extends Model
{
    use HasFactory;

    protected $fillable = [
        'record_date',
        'mood_score',
        'condition_score',
        'memo',
    ];
}
