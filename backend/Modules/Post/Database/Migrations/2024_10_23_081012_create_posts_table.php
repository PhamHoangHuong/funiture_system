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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('topic_id')->nullable()->comment('Topic ID');
            $table->unsignedBigInteger('user_id')->nullable()->comment('User Created ID');

            $table->string('title')->nullable()->comment('Tên bài viết');
            $table->string('slug')->nullable()->comment('Đường dẫn tĩnh');
            $table->tinyInteger('type')->default(1)->comment('Loại bài viết: 1: Blog, 2: Tin tức, 3: Sự kiện, 4: Khuyến mãi, 5: Video, 6: Hướng dẫn, 7: Thông báo, 8: Tuyển dụng, 9: Liên hệ');
            $table->text('content')->nullable()->comment('Nội dung bài viết');
            $table->string('description')->nullable()->comment('Mô tả bài viết');
            $table->string('image')->nullable()->comment('Ảnh đại diện');
            $table->tinyInteger('status')->default(1)->comment('Trạng thái bài viết: 1: Xuất bản, 0: Ẩn, 2: Bản nháp');

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('topic_id')->references('id')->on('topics')->onDelete('set null');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
};
