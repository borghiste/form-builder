<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class FormField extends Model
{
    use HasFactory;
    protected $table = 'form_fields';
    protected $fillable = ['label', 'type', 'required', 'form_id'
    // 'order', 
    // 'placeholder', 'description', 
    ];

    public function form(){
        return $this->belongsTo(Form::class, 'form_id');
    }
}
