<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('advanced_prices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->string('type'); // Loại giá (theo biến thể/số lượng)
            $table->dateTime('start_time')->nullable(); // Thời gian bắt đầu áp dụng
            $table->dateTime('end_time')->nullable(); // Thời gian kết thúc áp dụng
            $table->decimal('amount', 10, 2); // Giá trị giảm giá/khuyến mãi
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('advanced_prices');
    }
};
