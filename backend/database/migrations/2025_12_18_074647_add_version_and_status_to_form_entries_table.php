<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('form_entries', function (Blueprint $table) {
            $table->unsignedInteger('form_version')->default(1)->after('form_id');
            $table->string('status', ['draft', 'submitted'])
                  ->default('submitted')
                  ->after('form_version');
        });
    }

    public function down(): void
    {
        Schema::table('form_entries', function (Blueprint $table) {
            $table->dropColumn(['form_version', 'status']);
        });
    }
};
