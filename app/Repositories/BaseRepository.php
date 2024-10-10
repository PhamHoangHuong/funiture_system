<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

abstract class BaseRepository implements RepositoryInterface
{
    protected $model;

    public function __construct()
    {
        $this->setModel();
    }

    public function setModel()
    {
        $this->model = app()->make($this->getModel());
    }

    abstract public function getModel(): string;

    public function getAll()
    {
        return $this->model->all();
    }

    public function find(int $id)
    {
        return $this->model->find($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data)
    {
        $record = $this->find($id);
        if ($record) {
            $record->update($data);
            return $record;
        }
        return false;
    }

    public function delete(int $id)
    {
        $record = $this->find($id);
        if ($record) {
            return $record->delete();
        }
        return false;
    }

    public function changeStatus(int $id, string $status)
    {
        $record = $this->find($id);
        if ($record) {
            $record->status = $status;
            $record->save();
            return $record;
        }
        return false;
    }

    public function existsBySlug(string $slug, $excludeId = null): bool
    {
        $query = $this->model->where('slug', $slug);
        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }
        return $query->exists();
    }

    public function deleteVariants(int $parentId)
    {
        return $this->model->where('parent_id', $parentId)->delete();
    }

    // public function toResponseSuccess($data, $message = 'Thành công', $status = Response::HTTP_OK)
    // {
    //     return response()->json([
    //         'message' => $message,
    //         // 'data' => $data
    //     ], $status);
    // }

    // public function toResponseBad($message, $status = Response::HTTP_BAD_REQUEST)
    // {
    //     return response()->json([
    //         'error' => $message
    //     ], $status);    
    // }

    // public function handleException(\Exception $e)
    // {
    //     DB::rollBack();
    //     Log::error('Lỗi: ' . $e->getMessage(), ['exception' => $e]);
    //     return $this->toResponseBad($e->getMessage());
    // }
}
