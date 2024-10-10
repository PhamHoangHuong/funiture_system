<?php

namespace Modules\Customer\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Customer\Http\Requests\StoreCustomerRequest;
use Modules\Customer\Http\Requests\UpdateCustomerRequest;
use Symfony\Component\HttpFoundation\Response;
use Modules\Customer\Repositories\CustomerRepositoryInterface;
use Modules\Customer\Transformers\CustomerResource;
use Modules\GroupCustomer\Repositories\GroupCustomerRepositoryInterface;
use Modules\Traits\ResponseTrait;

class CustomerController extends Controller
{
    use ResponseTrait;
    protected $customerRepository;
    protected $groupCustomerRepository;
    public function __construct(CustomerRepositoryInterface $customerRepository, GroupCustomerRepositoryInterface $groupCustomerRepository)
    {
        $this->customerRepository = $customerRepository;
        $this->groupCustomerRepository = $groupCustomerRepository;
    }
    public function index()
    {
        $list = $this->customerRepository->getAll();
        if(!$list)
        {
            return $this->toResponseBad('No data found',Response::HTTP_NO_CONTENT);
        }
        return $this->toResponseSuccess(CustomerResource::collection($list));
    }

    public function store(StoreCustomerRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $this->customerRepository->create($request->validated());
            DB::commit();
            return $this->toResponseSuccess($data, 'New Customer created successfully');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function show($id)
    {
        try {
            $group = $this->customerRepository->find($id);
            if (!$group) {
                return $this->toResponseBad('Customer not found',Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess(new CustomerResource($group));
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function update(UpdateCustomerRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $group = $this->customerRepository->update($id, $request->validated());
            DB::commit();
            return $this->toResponseSuccess(new CustomerResource($group), 'Customer data updated successfully');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $this->customerRepository->delete($id);
            DB::commit();
            return $this->toResponseDeleteSuccess('Customer data deleted successfully');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}
