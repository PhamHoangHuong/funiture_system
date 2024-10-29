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
        Schema::create('sliders', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable()->comment('Tiêu đề');
            $table->tinyInteger('type')->nullable()->comment('Loại: 1:slider, 2:banner');
            $table->string('position')->nullable()->comment('Vị trí');
            $table->tinyInteger('status')->default(1)->comment('Trạng thái');
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
        Schema::dropIfExists('sliders');
    }
};
