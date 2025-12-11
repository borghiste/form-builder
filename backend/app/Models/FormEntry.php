<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FormEntry extends Model
{
    use HasFactory;

    protected $table = 'form_entries';

    protected $fillable = [
        'form_id',
        'data',
    ];

    protected $casts = [
        'data' => 'array', // Se vuoi gestire JSON automaticamente
    ];

    public function form()
    {
        return $this->belongsTo(Form::class);
    }
}
