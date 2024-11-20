<?php

namespace Modules\Customer\Repositories;

use Modules\Source\Entities\Ward;
use App\Repositories\BaseRepository;
use Modules\Source\Entities\District;
use Modules\Source\Entities\Province;
use Modules\Customer\Entities\Customer;

class CustomerRepository extends BaseRepository implements CustomerRepositoryInterface
{
    public function getModel(): string
    {
        return Customer::class;
    }


    public function getFullAddress($user)
    {
        // Tải các mối quan hệ liên quan
        // $user->with(['address' => function ($query) {
        //     $query->with(['province', 'district', 'ward'])->where('default_status', 1);
        // }]);
    
        $location = $user->address(function ($query) {
            $query->with(['province', 'district', 'ward'])->where('default_status', 1);
        })->first();
        if (!$location) {
            return null;
        }
        
        return "{$location->ward->name}, {$location->district->name}, {$location->province->name}";
    }
    

}