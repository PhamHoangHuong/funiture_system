<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Database\Seeders\SourceProductsTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admins = [
            ['name' => 'admin1', 'username' => 'admin1', 'email' => 'admin1@gmail.com'],
            ['name' => 'admin2', 'username' => 'admin2', 'email' => 'admin2@gmail.com'],
            ['name' => 'admin3', 'username' => 'admin3', 'email' => 'admin3@gmail.com'],
            ['name' => 'admin4', 'username' => 'admin4', 'email' => 'admin4@gmail.com'],
            ['name' => 'admin5', 'username' => 'admin5', 'email' => 'admin5@gmail.com'],
        ];

        foreach ($admins as $adminData) {
            $user = new User();
            $user->name = $adminData['name'];
            $user->username = $adminData['username'];
            $user->email = $adminData['email'];
            $user->password = Hash::make('12345678');
            $user->save();
        }




        $this->call(SourceProductsTableSeeder::class);
        $this->call(GroupCustomersTableSeeder::class);
    }
}
