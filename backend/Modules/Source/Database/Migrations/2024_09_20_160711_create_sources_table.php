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
        Schema::dropIfExists('sources');

        Schema::create('sources', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 255)->unique()->comment('Tên nguồn cung cấp');
            $table->string('district', 20)->comment('Quận');
            $table->string('province', 20)->comment('Tỉnh');
            $table->string('ward', 20)->comment('Phường');
            $table->string('address', 255)->comment('Địa chỉ');
            $table->boolean('active')->default(true);
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sources');
    }
};
