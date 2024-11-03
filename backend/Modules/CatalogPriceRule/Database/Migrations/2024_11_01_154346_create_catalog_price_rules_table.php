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
        Schema::create('catalog_price_rules', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable()->comment('Tên chương trình khuyến mãi.');
            $table->text('description')->nullable()->comment('Mô tả.');
            $table->tinyInteger('is_active')->default(0)->comment('Trạng thái. 0: Không kích hoạt, 1: Kích hoạt.');
            $table->dateTime('start_time')->nullable()->comment('Thời gian bắt đầu.');
            $table->dateTime('end_time')->nullable()->comment('Thời gian kết thúc.');
            $table->string('group_customer_ids')->nullable()->comment('Mã nhóm khách hàng');
            $table->tinyInteger('condition_apply')->nullable()
                ->comment('Áp dụng cho. 1: Tất cả sản phẩm, 2: Sản phẩm được chọn, 3: Danh mục sản phẩm, 4: Nhóm thuộc tính sản phẩm');
            $table->string('condition_value')->nullable()->comment('Giá trị điều kiện.');
            $table->decimal('discount_amount', 12, 4)->nullable()->comment('Giảm giá: phần trăm hoặc số tiền.');
            $table->smallInteger('operator')->nullable()
                ->comment('Toán tử. 1: bigger_than, 2: less_than, 3: equal, 4: not_equal, 5: greater_than_or_equal, 6: less_than_or_equal');
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
        Schema::dropIfExists('catalog_price_rules');
    }
};
