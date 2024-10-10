<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('group_id')->nullable()->comment('Liên kết nhóm khách hàng');
            $table->string('name')->comment('Họ tên khách hàng');
            $table->string('phone')->comment('Số điện thoại khách hàng');
            $table->string('email')->unique()->comment('Email khách hàng');
            $table->string('address')->nullable()->comment('Địa chỉ');
            $table->string('point')->comment('Tích điểm thành viên');
            $table->tinyInteger('status')->comment('Trạng thái tài khoản');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('group_id')->references('id')->on('group_customers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customers');
    }
};
