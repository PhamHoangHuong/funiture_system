<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('products');

        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 255)->comment('Tên sản phẩm');
            $table->string('slug', 255)->unique()->comment('URL-friendly name');
            $table->text('description')->nullable()->comment('Mô tả ngắn gọn sản phẩm');
            $table->text('content')->nullable()->comment('Nội dung chi tiết sản phẩm');
            $table->string('image')->nullable()->comment('Đường dẫn đến hình ảnh sản phẩm');
            $table->boolean('status')->default(true)->comment('Trạng thái sản phẩm');
            $table->float('weight')->nullable()->comment('Cân nặng sản phẩm');
            $table->decimal('price', 10, 2)->comment('Giá gốc sản phẩm');
            $table->dateTime('start_new_time')->nullable()->comment('Thời gian bắt đầu sản phẩm mới');
            $table->dateTime('end_new_time')->nullable()->comment('Thời gian kết thúc sản phẩm mới');
            $table->unsignedBigInteger('parent_id')->nullable()->comment('Liên kết sản phẩm chính/phụ');
            $table->string('sku')->nullable()->comment('Mã sản phẩm');
            $table->string('seo_title')->nullable()->comment('Tiêu đề SEO');
            $table->text('seo_description')->nullable()->comment('Mô tả SEO');
            $table->string('video_link')->nullable()->comment('Đường dẫn video liên quan');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
