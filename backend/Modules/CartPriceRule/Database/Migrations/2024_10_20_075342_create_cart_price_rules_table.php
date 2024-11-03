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
            $table->text('description')->nullable()->comment('Mô tả.');
            $table->dateTime('start_time')->nullable()->comment('Thời gian bắt đầu.');
            $table->dateTime('end_time')->nullable()->comment('Thời gian kết thúc.');
            $table->tinyInteger('is_active')->default(0)->comment('Trạng thái. 0: Không kích hoạt, 1: Kích hoạt.');
            $table->mediumText('conditions_serialized')->nullable()->comment('1 hoặc nhiều Điều kiện áp dụng.');
            $table->tinyInteger('simple_action')->nullable()->comment('Hành động đơn giản. 1: Giảm giá giá trị đơn hàng, 2: Giảm giá phần trăm đơn hàng, 3: Giảm giá giá trị sản phẩm, 4: Giảm giá phần trăm sản phẩm.');
            $table->string('coupon')->nullable()->comment('Mã giảm giá.');
            $table->decimal('discount_amount', 12, 4)->nullable()->comment('Số tiền giảm giá.');
            $table->tinyInteger('discount_qty')->nullable()->comment('Số lượng giảm giá.');
            $table->tinyInteger('discount_step')->nullable()->comment('Bước giảm giá.');
            $table->integer('usage_limit')->nullable()->comment('Giới hạn sử dụng.');
            $table->integer('used')->default(0)->comment('Số lần đã sử dụng.');
            $table->tinyInteger('coupon_type')->nullable()->default(1)->comment('Loại mã giảm giá. 1: Mã giảm giá, 2: Mã miễn phí vận chuyển.');
            $table->integer('sort_order')->nullable()->comment('Thứ tự sắp xếp.');

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
        Schema::dropIfExists('cart_price_rules');
    }
};
