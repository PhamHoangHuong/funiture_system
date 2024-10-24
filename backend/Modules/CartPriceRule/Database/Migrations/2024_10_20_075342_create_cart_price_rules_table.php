<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cart_price_rules', function (Blueprint $table) {
            $table->id();

            $table->string('name')->nullable()->comment('Tên chương trình khuyến mãi.');
            $table->string('label')->nullable()->comment('Nhãn.');
            $table->text('description')->nullable()->comment('Mô tả.');
            $table->string('coupon')->nullable()->comment('Mã giảm giá.');
            $table->tinyInteger('type')->nullable()->comment('Loại giảm giá. 1: Giảm giá theo phần trăm, 2: Giảm giá theo số tiền.');
            $table->integer('amount')->nullable()->comment('Số tiền giảm giá hoặc phần trăm giảm giá.');
            $table->integer('quantity')->nullable()->comment('Số lượng áp dụng.');
            $table->dateTime('start_time')->nullable()->comment('Thời gian bắt đầu.');
            $table->dateTime('end_time')->nullable()->comment('Thời gian kết thúc.');
            $table->integer('priority')->nullable()->comment('Thứ tự ưu tiên.');
            $table->tinyInteger('status')->default(1)->comment('Trạng thái.');
            $table->enum('applicable_to', ['all', 'specific_products', 'specific_categories'])->default('all')->comment('Áp dụng cho: tất cả, sản phẩm cụ thể, hoặc danh mục cụ thể.');
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
        Schema::dropIfExists('cart_price_rules');
    }
};
