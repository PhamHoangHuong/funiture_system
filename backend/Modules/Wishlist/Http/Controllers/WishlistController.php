<?php

namespace Modules\Wishlist\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Traits\ResponseTrait;
use Modules\Wishlist\Http\Requests\WishlistRequest;
use Modules\Wishlist\Repositories\WishlistRepositoryInterface;
use Symfony\Component\HttpFoundation\Response;

class WishlistController extends Controller
{
    use ResponseTrait;

    protected $guard;
    protected $wishlistRepository;

    public function __construct(WishlistRepositoryInterface $wishlistRepository)
    {
        $this->wishlistRepository = $wishlistRepository;
        $this->guard = 'customer';
    }

    public function index()
    {
        try{
            $listWishlist = $this->wishlistRepository->getAll();
            if($listWishlist->isEmpty()){
                return $this->toResponseSuccess(null, "Danh sách yêu thích trống", Response::HTTP_NO_CONTENT);
            }
            return $this->toResponseSuccess($listWishlist, "Lấy danh sách yêu thích thành công", Response::HTTP_OK);
        }catch (\Exception $e){
            $message = $this->handleException($e);
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(WishlistRequest $request)
    {
        DB::BeginTransaction();
        try{
            $this->wishlistRepository->create($request->validated());
            DB::commit();
            return $this->toResponseSuccess(null,"Thêm sản phẩm vào danh sách yêu thích thành công", Response::HTTP_CREATED);
        }catch (\Exception $e){
            DB::rollBack();
            $message = $this->handleException($e);
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function destroy($id)
    {
        DB::BeginTransaction();
        try{
            $this->wishlistRepository->delete($id);
            DB::commit();
            return $this->toResponseSuccess(null,"Xóa sản phẩm khỏi danh sách yêu thích thành công", Response::HTTP_OK);
        }catch (\Exception $e){
            DB::rollBack();
            $message = $this->handleException($e);
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
