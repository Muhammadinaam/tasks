<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\TaskComment;
use Auth;
use DB;

class TaskCommentController extends Controller
{
    public function store()
    {
        $task_id = request()->task_id;
        $comment = request()->task_comment;   
        
        $task_comment = new TaskComment();
        $task_comment->task_id = $task_id;
        $task_comment->comment = $comment;
        $task_comment->created_by = Auth::user()->id;

        $task_comment->save();

        return ['success' => true, 'id' => $task_comment->id, 'message' => 'Task Comment posted successfully'];
    }

    public function updateCommentsReads()
    {
        $comments = request()->comments;
        $task_id = request()->task_id;
        $user_id = Auth::user()->id;

        try {
            \DB::beginTransaction();
            $task = \App\Task::find($task_id);
            foreach($task->taskComments as $task_comment) {
                $task_comment->taskCommentReads()->where('read_by', $user_id)->delete();
            }

            foreach($comments as $task_comment) {
                $task_comment_read = new \App\TaskCommentRead();
                $task_comment_read->comment_id = $task_comment['id'];
                $task_comment_read->read_by = $user_id;
                $task_comment_read->save();
            }

            \DB::commit();
            return ['success' => true];
        } catch (\Exception $ex) {
            throw $ex;
            \DB::rollBack();
            return ['success' => false, 'ex' => $ex];
        }

        
    }
}
