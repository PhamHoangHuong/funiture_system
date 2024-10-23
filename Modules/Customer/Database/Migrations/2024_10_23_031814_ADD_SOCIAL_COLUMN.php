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
        Schema::table('customers', function ($table) {
            $table->string('google_id')->nullable();
            $table->string('facebook_id')->nullable();

        });
    }
    
    public function down()
    {
        Schema::table('customers', function ($table) {
            $table->dropColumn('google_id');
            $table->dropColumn('facebook_id');

        });
    }
};
