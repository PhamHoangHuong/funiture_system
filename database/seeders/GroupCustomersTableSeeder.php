<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class GroupCustomersTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $groups = [
            ['name' => 'NOT LOGGED IN', 'code' => 'NOT_LOGGED_IN','status'=>1],
            ['name' => 'General', 'code' => 'general','status'=>1],
            ['name' => 'Wholesale', 'code' => 'wholesale','status'=>1],
            ['name' => 'Retailer', 'code' => 'retailer','status'=>1],
        ];
        foreach ($groups as $group) {
            DB::table('group_customers')->insert([
                'name' => $group['name'],
                'code' => $group['code'],
                'status' => $group['status'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
