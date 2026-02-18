<?php

// database/migrations/2024_01_01_000001_create_organizations_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('subdomain')->unique();
            $table->string('slug')->unique();
            $table->enum('plan', ['free', 'pro', 'enterprise'])->default('free');
            $table->integer('max_users')->default(1);
            $table->integer('max_forms')->default(3);
            $table->integer('max_responses_per_month')->default(100);
            $table->string('logo_url')->nullable();
            $table->json('custom_branding')->nullable(); // colori, font, etc
            $table->json('settings')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamp('trial_ends_at')->nullable();
            $table->timestamp('subscription_ends_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('organizations');
    }
};
