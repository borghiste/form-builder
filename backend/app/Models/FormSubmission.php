<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FormSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'form_id',
        //'form_version',
        //'status',
        'data',
    ];

    protected $casts = [
        'data' => 'array', 
        
    ];

    public function form()
    {
        return $this->belongsTo(Form::class);
    }
}
