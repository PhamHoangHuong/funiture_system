<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sources', function (Blueprint $table) {
            // Drop existing columns if they exist
            if (Schema::hasColumn('sources', 'province')) {
                $table->dropColumn('province');
            }
            if (Schema::hasColumn('sources', 'district')) {
                $table->dropColumn('district');
            }
            if (Schema::hasColumn('sources', 'ward')) {
                $table->dropColumn('ward');
            }

            // Add new columns if they don't exist
            if (!Schema::hasColumn('sources', 'address')) {
                $table->string('address', 255)->comment('Địa chỉ cụ thể')->after('name');
            }
            if (!Schema::hasColumn('sources', 'province_id')) {
                $table->string('province_id', 20)->nullable()->after('address');
            }
            if (!Schema::hasColumn('sources', 'district_id')) {
                $table->string('district_id', 20)->nullable()->after('province_id');
            }
            if (!Schema::hasColumn('sources', 'ward_id')) {
                $table->string('ward_id', 20)->nullable()->after('district_id');
            }

            // Add foreign key constraints
            $table->foreign('province_id')->references('code')->on('provinces')->onDelete('set null');
            $table->foreign('district_id')->references('code')->on('districts')->onDelete('set null');
            $table->foreign('ward_id')->references('code')->on('wards')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('sources', function (Blueprint $table) {
            // Drop foreign key constraints
            $table->dropForeign(['province_id']);
            $table->dropForeign(['district_id']);
            $table->dropForeign(['ward_id']);

            // Drop new columns
            $table->dropColumn(['address', 'province_id', 'district_id', 'ward_id']);

            // Add back old columns
            $table->string('province', 20)->comment('Tỉnh');
            $table->string('district', 20)->comment('Quận');
            $table->string('ward', 20)->comment('Phường');
        });
    }
};
