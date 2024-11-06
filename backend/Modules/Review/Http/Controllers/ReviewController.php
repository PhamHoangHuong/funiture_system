<?php

namespace Modules\Review\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Review\Http\Requests\ReviewRequest;
use Modules\Review\Repositories\ReviewRepositoryInterface;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class ReviewController extends Controller
{
    use ResponseTrait;

    protected $reviewRepository;
    public function __construct(ReviewRepositoryInterface $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    public function index()
    {
        try{
            $listReview = $this->reviewRepository->getAll();
            if($listReview ->isEmpty()){
                return $this->toResponseBad('No data found',Response::HTTP_NO_CONTENT);
            }
            return $this->toResponseSuccess($listReview,'Data Found',Response::HTTP_OK);
        }catch (\Exception $exception){
            return $this->toResponseBad($exception->getMessage(),Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(ReviewRequest $request)
    {
        DB::beginTransaction();
        try{
            $this->reviewRepository->create($request->validated());
            DB::commit();
            return $this->toResponseSuccess(null,'Data Created',Response::HTTP_CREATED);
        }catch (\Exception $exception){
            DB::rollBack();
            return $this->toResponseBad($exception->getMessage(),Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(ReviewRequest $request, $id)
    {
        DB::beginTransaction();
        try{
            $review = $this->reviewRepository->find($id);
            if(!$review){
                return $this->toResponseBad('No data found',Response::HTTP_NOT_FOUND);
            }
            $this->reviewRepository->update($id,$request->validated());
            DB::commit();
            return $this->toResponseSuccess($review,'Data Updated',Response::HTTP_OK);
        }catch (\Exception $exception){
            DB::rollBack();
            return $this->toResponseBad($exception->getMessage(),Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function destroy($id)
    {
        DB::beginTransaction();
        try{
            $review = $this->reviewRepository->find($id);
            if(!$review){
                return $this->toResponseBad('No data found',Response::HTTP_NOT_FOUND);
            }
            $this->reviewRepository->update($id,['status'=>2]);
            $this->reviewRepository->delete($id);
            DB::commit();
            return $this->toResponseSuccess($review,'Data Deleted',Response::HTTP_OK);
        }catch (\Exception $exception) {
            DB::rollBack();
            return $this->toResponseBad($exception->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
