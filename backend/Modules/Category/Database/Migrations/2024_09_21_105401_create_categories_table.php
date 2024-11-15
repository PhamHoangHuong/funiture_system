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
        Schema::create('categories', function (Blueprint $table) {
            $table->id ();
            $table->string('name',)->nullable()->comment('Tên danh mục');
            $table->string('slug',)->nullable()->unique()->comment('Đường dẫn thân thiện');
            $table->integer('parent_id')->nullable()->comment('ID danh mục cha');
            $table->string('image')->nullable()->comment('Ảnh bìa danh mục');
            $table->string('description')->nullable()->comment('Mô tả danh mục');
            $table->tinyInteger('status')->default(1)->comment('Trạng thái danh mục');
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
        Schema::dropIfExists('categories');
    }
};
