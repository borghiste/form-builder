<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class FormField extends Model
{
    use HasFactory;
    protected $table = 'form_fields';
    protected $fillable = ['form_id', 'label', 'type', 'required', 'order'];
}
