<?php

namespace Modules\Customer\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Customer\Http\Requests\StoreCustomerRequest;
use Modules\Customer\Http\Requests\UpdateCustomerRequest;
use Modules\Customer\Repositories\CustomerRepositoryInterface;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class CustomerController extends Controller
{
    use ResponseTrait;
    protected $customerRepository;

    public function __construct(CustomerRepositoryInterface $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }

    public function index()
    {
        $customers = $this->customerRepository->getAll();

        if($customers->isEmpty()){
            return $this->toResponseBad('Không tìm thấy dữ liệu.',Response::HTTP_NOT_FOUND);
        }
        return $this->toResponseSuccess('Lấy dữ liệu thành công.',Response::HTTP_OK);
    }


    public function store(StoreCustomerRequest $request)
    {
        DB::beginTransaction();
        try{
            $data = $request->validated();

            if ($request->password !== $request->password_confirmation) {
                return $this->toResponseBad('Mật khẩu và mật khẩu xác nhận không khớp.', Response::HTTP_BAD_REQUEST);
            }

            $data['password'] = bcrypt($request->password);
            $this->customerRepository->create($data);
            DB::commit();
            return $this->toResponseSuccess('Thêm mới khách hàng thành công.',Response::HTTP_OK);
        }catch (\Exception $exception){
            DB::rollBack();
            return $this->toResponseBad('Thêm mới khách hàng thất bại.',Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }




    public function update(UpdateCustomerRequest $request, $id)
    {
        DB::beginTransaction();
        try{
            $data = $request->validated();
            $customer = $this->customerRepository->find($id);
            if (!$customer) {
                return $this->toResponseBad('Khách hàng không tồn tại.', Response::HTTP_NOT_FOUND);
            }
            if ($request->password) {
                if ($request->password !== $request->password_confirmation) {
                    return $this->toResponseBad('Mật khẩu và mật khẩu xác nhận không khớp.', Response::HTTP_BAD_REQUEST);
                }
                $data['password'] = bcrypt($request->password);
            }

            $customer->update($data);
            DB::commit();
            return $this->toResponseSuccess('Cập nhật khách hàng thành công.',Response::HTTP_OK);
        }catch (\Exception $exception){
            DB::rollBack();
            return $this->toResponseBad('Cập nhật khách hàng thất bại.',Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function destroy($id)
    {
        DB::beginTransaction();
        try{
            $customer = $this->customerRepository->find($id);
            if (!$customer) {
                return $this->toResponseBad('Khách hàng không tồn tại.', Response::HTTP_NOT_FOUND);
            }
            $this->customerRepository->delete($id);
            DB::commit();
            return $this->toResponseSuccess('Xóa khách hàng thành công.',Response::HTTP_OK);
        }catch (\Exception $exception){
            DB::rollBack();
            return $this->toResponseBad('Xóa khách hàng thất bại.',Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
