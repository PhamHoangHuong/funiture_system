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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('group_id')->comment('Mã Nhóm Khách hàng');
            $table->string('name')->nullable()->comment('Tên khách hàng');
            $table->integer('phone')->nullable()->comment('Số điện thoại');
            $table->string('email')->unique()->comment('Email');
            $table->string('address')->nullable()->comment('Địa chỉ');
            $table->integer('point')->nullable()->default(0)->comment('Điểm thành viên');
            $table->tinyInteger('status')->comment('Trạng thái tài khoản');
            $table->string('password')->comment('Mật khẩu');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('group_id')->references('id')->on('group_customer')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
