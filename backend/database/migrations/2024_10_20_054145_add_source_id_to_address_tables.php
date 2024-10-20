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
        Schema::table('provinces', function (Blueprint $table) {
            $table->unsignedBigInteger('source_id')->nullable()->after('administrative_region_id');
            $table->foreign('source_id')->references('id')->on('sources')->onDelete('set null');
        });

        Schema::table('districts', function (Blueprint $table) {
            $table->unsignedBigInteger('source_id')->nullable()->after('administrative_unit_id');
            $table->foreign('source_id')->references('id')->on('sources')->onDelete('set null');
        });

        Schema::table('wards', function (Blueprint $table) {
            $table->unsignedBigInteger('source_id')->nullable()->after('administrative_unit_id');
            $table->foreign('source_id')->references('id')->on('sources')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('wards', function (Blueprint $table) {
            $table->dropForeign(['source_id']);
            $table->dropColumn('source_id');
        });

        Schema::table('districts', function (Blueprint $table) {
            $table->dropForeign(['source_id']);
            $table->dropColumn('source_id');
        });

        Schema::table('provinces', function (Blueprint $table) {
            $table->dropForeign(['source_id']);
            $table->dropColumn('source_id');
        });
    }
};