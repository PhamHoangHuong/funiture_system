<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_address', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->string('address', 255)->comment('Địa chỉ cụ thể');
            $table->string('phone');
            $table->string('province_code')->nullable();
            $table->string('district_code')->nullable();
            $table->string('ward_code')->nullable();
            $table->boolean('default_status')->default(false)->comment('Trạng thái mặc định');
            $table->softDeletes();
            $table->timestamps();
            $table->foreign('customer_id')->references('id')->on('customers');

            $table->foreign('province_code')->references('code')->on('provinces')->onDelete('set null');
            $table->foreign('district_code')->references('code')->on('districts')->onDelete('set null');
            $table->foreign('ward_code')->references('code')->on('wards')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customer_address');
    }
};
