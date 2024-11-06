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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('fullname')->nullable()->comment('Tên người liên hệ');
            $table->string('email')->nullable()->comment('Email người liên hệ');
            $table->string('phone')->nullable()->comment('Số diện thoại người liên hệ');
            $table->string('subject')->nullable()->comment('Chủ đề liên hệ');
            $table->text('message')->nullable()->comment('Nội dung liên hệ');
            $table->tinyInteger('status')->default('0')->comment('Trạng thái liên hệ: 0 - Chưa trả lời, 1 - Đã trả lời.');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacts');
    }
};
