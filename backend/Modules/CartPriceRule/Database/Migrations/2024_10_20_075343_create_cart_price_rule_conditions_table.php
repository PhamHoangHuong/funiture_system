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
        Schema::create('cart_price_rule_conditions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cart_price_rule_id')->nullable()->comment('ID chương trình khuyến mãi.');
//            $table->enum('logical_operator', ['AND', 'OR'])->default('AND')->comment('Toán tử logic giữa các điều kiện.');
            $table->tinyInteger('type')->default(1)->comment('Điều kiện áp dụng.');
            $table->string('name')->nullable()->comment('Tên điều kiện.');
            $table->string('value')->nullable()->comment('Giá trị điều kiện.');
            $table->enum('operator', ['greater_than', 'smaller_than', 'equal'])->nullable()->comment('Toán tử so sánh.');
            $table->tinyInteger('status')->default(1)->comment('Trạng thái.');
            $table->timestamps();
            $table->foreign('cart_price_rule_id')->references('id')->on('cart_price_rules')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cart_price_rule_conditions');
    }
};
