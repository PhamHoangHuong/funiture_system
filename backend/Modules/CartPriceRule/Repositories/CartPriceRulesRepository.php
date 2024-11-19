<?php

namespace Modules\CartPriceRule\Repositories;

use App\Repositories\BaseRepository;
use Illuminate\Support\Carbon;
use Modules\CartPriceRule\Entities\CartPriceRule;

class CartPriceRulesRepository extends BaseRepository implements CartPriceRulesRepositoryInterface
{
    public function getModel(): string
    {
        return CartPriceRule::class;
    }
    public function existsByCoupon($coupon, $exceptId = null)
    {
        $query = $this->model->where('coupon', $coupon);
        if($exceptId){
            $query->where('id', '!=', $exceptId);
        }
        return $query->exists();
    }

    public function checkRule($rule)
    {
        // Kiểm tra xem rule có đang hoạt động không
        if (!$rule->is_active) {
            return ['error' => 'Rule không đang hoạt động'];
        }

        // Kiểm tra xem rule có còn trong thời gian sử dụng không
        $now = Carbon::now();
        if ($now->lt($rule->start_time)) {
            return ['error' => 'Rule chưa bắt đầu'];
        } elseif ($now->gt($rule->end_time)) {
            return ['error' => 'Rule đã hết hạn'];
        }

        // Kiểm tra xem rule có còn lượt sử dụng không
        if ($rule->usage_limit > 0 && $rule->used >= $rule->usage_limit) {
            return ['error' => 'Rule đã hết lượt sử dụng'];
        }

        return ['success' => true];
    }

    public function getRuleByCoupon($coupon)
    {
        return $this->model->where('coupon', $coupon)->first();
    }
}