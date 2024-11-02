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
        Schema::create('catalog_price_rules', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable()->comment('Tên chương trình khuyến mãi.');
            $table->text('description')->nullable()->comment('Mô tả.');
            $table->tinyInteger('is_active')->default(0)->comment('Trạng thái. 0: Không kích hoạt, 1: Kích hoạt.');
            $table->dateTime('start_time')->nullable()->comment('Thời gian bắt đầu.');
            $table->dateTime('end_time')->nullable()->comment('Thời gian kết thúc.');
            $table->mediumText('conditions_serialized')->nullable()->comment('Điều kiện áp dụng.');
            $table->tinyInteger('simple_action')->nullable()->comment('Giảm giá theo: 1: Giảm giá số tiền, 2: Giảm giá phần trăm, 3: Giảm giá cố định cho từng sản phẩm, 4: Giảm giá theo giá trị tối thiểu.');
            $table->decimal('discount_amount', 12, 4)->nullable()->comment('Số tiền giảm giá: phần trăm hoặc số tiền.');
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
