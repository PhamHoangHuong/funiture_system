<?php

namespace Modules\GroupCustomer\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\GroupCustomer\Http\Requests\StoreGroupCustomerRequest;
use Modules\GroupCustomer\Http\Requests\UpdateGroupCustomerRequest;
use Modules\GroupCustomer\Repositories\GroupCustomerRepositoryInterface;
use Modules\GroupCustomer\Transformers\GroupCustomerResource;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class GroupCustomerController extends Controller
{
    use ResponseTrait;

    protected $groupCustomerRepository;

    public function __construct(GroupCustomerRepositoryInterface $groupCustomerRepository)
    {
        $this->groupCustomerRepository = $groupCustomerRepository;
    }

    public function index()
    {
        $listGroup = $this->groupCustomerRepository->getAll();
        if (!$listGroup) {
            return $this->toResponseBad('No Data found', Response::HTTP_NO_CONTENT);
        }
        return $this->toResponseSuccess(GroupCustomerResource::collection($listGroup));
    }

    public function store(StoreGroupCustomerRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $this->groupCustomerRepository->create($request->validated());
            DB::commit();
            return $this->toResponseSuccess($data, 'New Group created successfully');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function show($id)
    {
        try {
            $group = $this->groupCustomerRepository->find($id);
            if (!$group) {
                return $this->toResponseBad('Group not found', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess(new GroupCustomerResource($group));
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function update(UpdateGroupCustomerRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $group = $this->groupCustomerRepository->update($id, $request->validated());
            DB::commit();
            return $this->toResponseSuccess(new GroupCustomerResource($group), 'Group data updated successfully');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $this->groupCustomerRepository->delete($id);
            DB::commit();
            return $this->toResponseDeleteSuccess('Group Customer deleted successfully');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}
