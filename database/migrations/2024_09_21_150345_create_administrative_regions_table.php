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
        // Administrative Regions
        Schema::dropIfExists('administrative_regions');
        Schema::create('administrative_regions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 255)->comment('Tên vùng hành chính');
            $table->string('name_en', 255)->comment('Tên vùng hành chính (tiếng Anh)');
            $table->string('code_name', 255)->nullable()->comment('Mã vùng');
            $table->string('code_name_en', 255)->nullable()->comment('Mã vùng (tiếng Anh)');
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();
        });

        // Administrative Units
        Schema::dropIfExists('administrative_units');
        Schema::create('administrative_units', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('full_name', 255)->nullable()->comment('Tên đầy đủ');
            $table->string('full_name_en', 255)->nullable()->comment('Tên đầy đủ (tiếng Anh)');
            $table->string('short_name', 255)->nullable()->comment('Tên ngắn');
            $table->string('short_name_en', 255)->nullable()->comment('Tên ngắn (tiếng Anh)');
            $table->string('code_name', 255)->nullable()->comment('Mã đơn vị');
            $table->string('code_name_en', 255)->nullable()->comment('Mã đơn vị (tiếng Anh)');
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();
        });

        // Provinces
        Schema::dropIfExists('provinces');
        Schema::create('provinces', function (Blueprint $table) {
            $table->string('code', 20)->primary()->comment('Mã tỉnh');
            $table->string('name', 255)->comment('Tên tỉnh');
            $table->string('name_en', 255)->nullable()->comment('Tên tỉnh (tiếng Anh)');
            $table->string('full_name', 255)->comment('Tên đầy đủ tỉnh');
            $table->string('full_name_en', 255)->nullable()->comment('Tên đầy đủ tỉnh (tiếng Anh)');
            $table->string('code_name', 255)->nullable()->comment('Mã tỉnh');
            $table->unsignedBigInteger('administrative_unit_id')->nullable()->comment('ID đơn vị hành chính');
            $table->unsignedBigInteger('administrative_region_id')->nullable()->comment('ID vùng hành chính');
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();

            // Foreign keys
            $table->foreign('administrative_unit_id')->references('id')->on('administrative_units')->onDelete('set null');
            $table->foreign('administrative_region_id')->references('id')->on('administrative_regions')->onDelete('set null');
        });

        // Districts
        Schema::dropIfExists('districts');
        Schema::create('districts', function (Blueprint $table) {
            $table->string('code', 20)->primary()->comment('Mã quận');
            $table->string('name', 255)->comment('Tên quận');
            $table->string('name_en', 255)->nullable()->comment('Tên quận (tiếng Anh)');
            $table->string('full_name', 255)->comment('Tên đầy đủ quận');
            $table->string('full_name_en', 255)->nullable()->comment('Tên đầy đủ quận (tiếng Anh)');
            $table->string('code_name', 255)->nullable()->comment('Mã quận');
            $table->string('province_code', 20)->nullable()->comment('Mã tỉnh');
            $table->unsignedBigInteger('administrative_unit_id')->nullable()->comment('ID đơn vị hành chính');
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();

            // Foreign keys
            $table->foreign('administrative_unit_id')->references('id')->on('administrative_units')->onDelete('set null');
            $table->foreign('province_code')->references('code')->on('provinces')->onDelete('cascade');
        });

        // Wards
        Schema::dropIfExists('wards');
        Schema::create('wards', function (Blueprint $table) {
            $table->string('code', 20)->primary()->comment('Mã phường');
            $table->string('name', 255)->comment('Tên phường');
            $table->string('name_en', 255)->nullable()->comment('Tên phường (tiếng Anh)');
            $table->string('full_name', 255)->comment('Tên đầy đủ phường');
            $table->string('full_name_en', 255)->nullable()->comment('Tên đầy đủ phường (tiếng Anh)');
            $table->string('code_name', 255)->nullable()->comment('Mã phường');
            $table->string('district_code', 20)->nullable()->comment('Mã quận');
            $table->unsignedBigInteger('administrative_unit_id')->nullable()->comment('ID đơn vị hành chính');
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();

            // Foreign keys
            $table->foreign('administrative_unit_id')->references('id')->on('administrative_units')->onDelete('set null');
            $table->foreign('district_code')->references('code')->on('districts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wards');
        Schema::dropIfExists('districts');
        Schema::dropIfExists('provinces');
        Schema::dropIfExists('administrative_units');
        Schema::dropIfExists('administrative_regions');
    }
};
