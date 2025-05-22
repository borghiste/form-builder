<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Form extends Model
{
    use HasFactory;
    protected $table ='forms';
    protected $fillable = ['name', 'description', 'created_at', 'updated_at'];
}
