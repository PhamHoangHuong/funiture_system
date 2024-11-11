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
            $table->json('group_customer_ids')->nullable()->comment('Mã nhóm khách hàng');
            $table->enum('condition_apply',['subtotal','total_qty','total_weight'])->nullable()->comment('Điều kiện áp dụng: subtotal, total_qty, total_weight');
            $table->integer('condition_value')->nullable()->comment('Giá trị điều kiện.');
            $table->string('coupon')->nullable()->comment('Mã giảm giá.');
            $table->decimal('discount_amount', 12, 4)->nullable()->comment('Số tiền giảm giá.');
            $table->tinyInteger('discount_qty')->nullable()->comment('Số lượng giảm giá.');
            $table->tinyInteger('discount_step')->nullable()->comment('Bước giảm giá.');
            $table->integer('usage_limit')->nullable()->comment('Giới hạn sử dụng.');
            $table->integer('used')->default(0)->comment('Số lần đã sử dụng.');
            $table->tinyInteger('coupon_type')->nullable()->default(1)->comment('Loại mã giảm giá. 1: Mã giảm giá, 2: Mã miễn phí vận chuyển.');
            $table->smallInteger('operator')->nullable()
                ->comment('Toán tử. 1: bigger_than, 2: less_than, 3: equal, 4: not_equal, 5: greater_than_or_equal, 6: less_than_or_equal');
            $table->enum('simple_action', ['by_percent', 'by_fixed', 'cart_fixed'])->nullable()->comment('Hành động: by_percent, by_fixed, cart_fixed');
            $table->integer('priority')->nullable()->comment('Ưu tiên.');
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
