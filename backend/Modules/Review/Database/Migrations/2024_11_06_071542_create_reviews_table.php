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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id')->comment('ID sản phẩm');
            $table->unsignedBigInteger('customer_id')->comment('ID khách hàng');
            $table->integer('parent_id')->nullable()->comment('ID bình luận cha');
            $table->string('title')->comment('Tiêu đề');
            $table->text('content')->comment('Nội dung');
            $table->decimal('rating')->comment('Điểm đánh giá');
            $table->tinyInteger('status')->default(1)->comment('Trạng thái: 1 - Đang hiển thị, 0 - Ẩn,2- Đã xóa');

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reviews');
    }
};
