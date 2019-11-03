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
    private $relations_affected_by_deletion;

    public function __construct($_permission_slug, $_model, $_relations, $_relations_affected_by_deletion) {
        $this->permission_slug = $_permission_slug;
        $this->model = $_model;
        $this->relations = $_relations;
        $this->relations_affected_by_deletion = $_relations_affected_by_deletion;
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

        // check relations
        foreach($this->relations_affected_by_deletion as $relation)
        {
            $count = $this->model::find($id)->{$relation}()->get()->count();
            if($count > 0) 
            {
                return [
                    'success' => false, 
                    'message' => 'Cannot delete because this item has been attached with ' . $count . ' ' . $relation,
                ];
            }
        }

        $this->model::destroy($id);
        return ['success' => true, 'message' => 'Deleted successfully'];
    }
}
