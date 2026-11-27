<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Form extends Model
{
    use HasFactory;
    protected $table ='forms';
    protected $fillable = ['name', 'description', 'created_at', 'updated_at', 'organization_id', 'created_by'];

    public function formFields(){
        return $this->hasMany(FormField::class, 'form_id');

}


    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}