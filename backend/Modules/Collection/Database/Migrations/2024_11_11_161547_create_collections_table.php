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
        Schema::create('collections', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable()->comment('Tên bộ sưu tập');
            $table->string('slug')->nullable()->unique()->comment('Đường dẫn thân thiện');
            $table->string('description')->nullable()->comment('Mô tả bộ sưu tập');
            $table->string('image')->nullable()->comment('Ảnh bìa bộ sưu tập');
            $table->tinyInteger('status')->default(1)->comment('Trạng thái bộ sưu tập');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('collections');
    }
};
