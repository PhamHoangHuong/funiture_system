<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class CustomerTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('customers')->insert([
            'group_id' => 1,
            'name' => 'customer_test',
            'phone' => 1234567890,
            'email' => 'customer_test@gmail.com',
            'address' => 'abcd123',
            'status' => 1,
            'password' =>Hash::make(123456789), // Or use another encrypted password
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ]);
    }
}