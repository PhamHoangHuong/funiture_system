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
        Schema::create('slider_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('slider_id')->nullable()->comment('Slider ID');
            $table->string('image')->comment('Hình ảnh');
            $table->string('link')->nullable()->comment('Liên kết');
            $table->string('name')->nullable()->comment('Tiêu đề');
            $table->string('description')->nullable()->comment('Mô tả');
            $table->integer('sort_order')->default(1)->comment('Thứ tự');
            $table->tinyInteger('active')->default(1)->comment('Trạng thái');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('slider_id')->references('id')->on('sliders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::dropIfExists('slider_images');
    }
};