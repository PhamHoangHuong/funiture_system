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
        Schema::create('topics', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable()->comment('Tên chủ đề');
            $table->string('slug')->unique()->nullable()->comment('Slug');
            $table->integer('parent_id')->nullable()->comment('ID chủ đề cha');
            $table->string('image')->nullable()->comment('Ảnh chủ đề');
            $table->string('description')->nullable()->comment('Mô tả chủ đề');
            $table->integer('sort_order')->nullable()->comment('Thứ tự sắp xếp');
            $table->tinyInteger('status')->default(1)->comment('Trạng thái: 1 - Kích hoạt, 0 - Không kích hoạt');
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
        Schema::dropIfExists('topics');
    }
};
