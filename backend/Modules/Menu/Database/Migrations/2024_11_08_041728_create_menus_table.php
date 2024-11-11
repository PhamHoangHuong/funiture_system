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
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable()->comment('Tên menu');
            $table->string('link')->nullable()->comment('Đường dẫn menu');
            $table->integer('parent_id')->nullable()->default(0)->comment('ID menu cha');
            $table->enum('position', ['header', 'footer','default'])->default('header')->comment('Vị trí menu');
            $table->integer('sort_order')->default(1)->comment('Thứ tự menu');
            $table->tinyInteger('status')->default(1)->comment('Trạng thái menu: 1 - Hiển thị, 0 - Ẩn');
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
        Schema::dropIfExists('menus');
    }
};
