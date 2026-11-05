<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('form_fields', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_id')->constrained()->onDelete('cascade');
            $table->string('label');
            $table->enum('type', [
                'text', 'email', 'number', 'tel', 'date', 'time', 
                'textarea', 'select', 'radio', 'checkbox', 'file'
            ]);
            $table->string('placeholder')->nullable();
            $table->json('options')->nullable(); // per select, radio, checkbox
            $table->json('validations')->nullable();
            $table->boolean('required')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('form_fields');
    }
};
