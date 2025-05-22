<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('forms', function ( Blueprint $table) {
            $table->id()->primary();
            $table->string('name', 255);
            $table->string('description')->nullable(false);
            $table->date('created_at')->nullable(false);
            $table->timestamp('updated_at')->nullable(false);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
