<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class SourceProductsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Seed Categories
        $categories = [
            ['name' => 'Phòng khách', 'slug' => 'phong-khach'],
            ['name' => 'Phòng ngủ', 'slug' => 'phong-ngu'],
            ['name' => 'Phòng ăn', 'slug' => 'phong-an'],
            ['name' => 'Văn phòng', 'slug' => 'van-phong'],
            ['name' => 'Ngoài trời', 'slug' => 'ngoai-troi'],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category['name'],
                'slug' => $category['slug'],
                'image' => 'https://example.com/images/' . $category['slug'] . '.jpg',
                'description' => 'Danh mục ' . $category['name'],
                'is_menu' => true,
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Seed Attributes
        $attributes = ['Màu sắc', 'Chất liệu', 'Kích thước', 'Phong cách', 'Thương hiệu'];
        foreach ($attributes as $attribute) {
            DB::table('attributes')->insert([
                'name' => $attribute,
                'description' => 'Thuộc tính ' . $attribute,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Seed Products
        $products = [
            ['name' => 'Bàn ăn gỗ sồi', 'category_id' => 3, 'price' => 5000000],
            ['name' => 'Ghế sofa da', 'category_id' => 1, 'price' => 15000000],
            ['name' => 'Tủ quần áo 4 cánh', 'category_id' => 2, 'price' => 8000000],
            ['name' => 'Bàn làm việc gỗ công nghiệp', 'category_id' => 4, 'price' => 2500000],
            ['name' => 'Ghế xích đu ngoài trời', 'category_id' => 5, 'price' => 3500000],
        ];

        foreach ($products as $product) {
            DB::table('products')->insert([
                'name' => $product['name'],
                'slug' => Str::slug($product['name']),
                'description' => 'Mô tả ngắn về ' . $product['name'],
                'content' => 'Nội dung chi tiết về ' . $product['name'],
                'image' => 'https://example.com/images/' . Str::slug($product['name']) . '.jpg',
                'status' => true,
                'weight' => rand(5, 100),
                'price' => $product['price'],
                'sku' => 'SKU-' . strtoupper(Str::random(8)),
                'stock_quantity' => rand(10, 100),
                'category_id' => $product['category_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Seed Sources
        $sources = [
            ['name' => 'Nội Thất Hòa Phát', 'province' => 'Hà Nội'],
            ['name' => 'Công ty TNHH Nội Thất TADA', 'province' => 'Hồ Chí Minh'],
            ['name' => 'Nội Thất Xuân Hòa', 'province' => 'Vĩnh Phúc'],
            ['name' => 'Nội Thất Đức Khang', 'province' => 'Đà Nẵng'],
            ['name' => 'Nội Thất Hưng Phát', 'province' => 'Bình Dương'],
        ];

        foreach ($sources as $source) {
            DB::table('sources')->insert([
                'name' => $source['name'],
                'province' => $source['province'],
                'district' => 'Quận/Huyện mặc định',
                'ward' => 'Phường/Xã mặc định',
                'address' => 'Địa chỉ mặc định',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Seed Source Products
        for ($i = 1; $i <= 5; $i++) {
            for ($j = 1; $j <= 5; $j++) {
                DB::table('source_products')->insert([
                    'product_id' => $i,
                    'source_id' => $j,
                    'quantity' => rand(50, 200),
                    'stock' => rand(10, 100),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // Seed Advanced Prices
        $advancedPrices = [
            ['product_id' => 1, 'type' => 'discount', 'amount' => 500000],
            ['product_id' => 2, 'type' => 'promotion', 'amount' => 1000000],
            ['product_id' => 3, 'type' => 'discount', 'amount' => 800000],
            ['product_id' => 4, 'type' => 'promotion', 'amount' => 250000],
            ['product_id' => 5, 'type' => 'discount', 'amount' => 350000],
        ];

        foreach ($advancedPrices as $price) {
            DB::table('advanced_prices')->insert([
                'product_id' => $price['product_id'],
                'type' => $price['type'],
                'start_time' => now(),
                'end_time' => now()->addDays(30),
                'amount' => $price['amount'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Seed Attribute Values
        $attributeValues = [
            ['attribute_id' => 1, 'value' => 'Đỏ'],
            ['attribute_id' => 1, 'value' => 'Xanh'],
            ['attribute_id' => 2, 'value' => 'Gỗ'],
            ['attribute_id' => 2, 'value' => 'Kim loại'],
            ['attribute_id' => 3, 'value' => 'Lớn'],
        ];

        foreach ($attributeValues as $value) {
            DB::table('attribute_values')->insert([
                'attribute_id' => $value['attribute_id'],
                'value' => $value['value'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Seed Product Attributes
        $productAttributes = [
            ['product_id' => 1, 'attribute_id' => 1],
            ['product_id' => 1, 'attribute_id' => 2],
            ['product_id' => 2, 'attribute_id' => 1],
            ['product_id' => 3, 'attribute_id' => 3],
            ['product_id' => 4, 'attribute_id' => 2],
        ];

        foreach ($productAttributes as $attr) {
            DB::table('product_attributes')->insert([
                'product_id' => $attr['product_id'],
                'attribute_id' => $attr['attribute_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
