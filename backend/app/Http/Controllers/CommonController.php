<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use DB;

class CommonController extends Controller
{
    private $permission_slug = '';
    private $model = '';
    private $relations = [];

    public function __construct($_permission_slug, $_model, $_relations) {
        $this->permission_slug = $_permission_slug;
        $this->model = $_model;
        $this->relations = $_relations;
    }

    public function store()
    {
        Auth::user()->abortIfDontHavePermission('add_' . $this->permission_slug);
        $this->validateRequest(null);
        try {
            DB::beginTransaction();
            $id = $this->storeData();
            DB::commit();
            return ['success' => true, 'message' => 'Saved Successfully', 'id' => $id];
        } catch (\Exception $ex) {
            return ['success' => false, 'message' => 'Error occurred: ' . $ex->getMessage(), 'ex' => $ex->getTrace()];
        }
    }

    public function edit($id)
    {
        return $this->model::with($this->relations)->find($id);
    }

    public function update($id)
    {
        Auth::user()->abortIfDontHavePermission('edit_' . $this->permission_slug);
        $this->validateRequest($id);
        try {
            DB::beginTransaction();
            $this->updateData($id);
            DB::commit();
            return ['success' => true, 'message' => 'Saved Successfully', 'id' => $id];
        } catch (\Exception $ex) {
            return ['success' => false, 'message' => 'Error occurred: ' . $ex->getMessage(), 'ex' => $ex->getTrace()];
        }
    }

    public function destroy($id)
    {
        Auth::user()->abortIfDontHavePermission('delete_' . $this->permission_slug);
        $this->model::destroy($id);
        return ['success' => true, 'message' => 'Deleted successfully'];
    }
}
