<?php

namespace Modules\Customer\Database\Seeders;

use Hash;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class CustomerDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Model::unguard();

//        DB::table('customers')->insert([
//            'group_id' => 1,
//            'name' => 'vanhung',
//            'phone' => 02370235022,
//            'email' => 'funiture@gmail.com',
//            'address' => '1111',
//            'status' => 10,
//            'password' =>Hash::make(111111), // Or use another encrypted password
//            'email_verified_at' => now(),
//            'remember_token' => Str::random(10),
//            'created_at' => now(),
//            'updated_at' => now(),
//            'deleted_at' => null,
//        ]);
    }
}
