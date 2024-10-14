<?php

namespace App\Repositories;

interface RepositoryInterface
{
    public function getAll();

    public function find(int $id, array $columns = ['*']);

    public function create(array $data);

    public function update(int $id, array $data);

    public function delete(int $id);

    public function changeStatus(int $id, string $status);

    public function existsBySlug(string $slug): bool;

    public function deleteVariants(int $parentId);

    // public function toResponseSuccess($data);

    // public function toResponseBad($message);

    // public function handleException(\Exception $e);
}
