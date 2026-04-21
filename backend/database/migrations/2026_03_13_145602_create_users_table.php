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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('email');
            $table->string('password');
            $table->enum('role', ['owner', 'admin', 'editor', 'viewer'])->default('editor');
            
            $table->boolean('is_active')->default(true);
            $table->foreignId('invited_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('last_login_at')->nullable();
            $table->string('last_login_ip')->nullable();
            $table->json('preferences')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();

            // Un utente può avere la stessa email in organizzazioni diverse
            $table->unique(['organization_id', 'email']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
