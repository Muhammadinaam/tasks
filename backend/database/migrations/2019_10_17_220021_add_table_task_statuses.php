<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTableTaskStatuses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_statuses', function (Blueprint $table) {
            $table->bigIncrements('id');
            
            $table->string('idt');
            $table->string('name');

            $table->timestamps();
        });

        DB::table('task_statuses')
            ->insert([
                [
                    'idt' => 'assigned',
                    'name' => 'Assigned'
                ],
                [
                    'idt' => 'review',
                    'name' => 'Review'
                ],
                [
                    'idt' => 'cancelled',
                    'name' => 'Cancelled'
                ],
                [
                    'idt' => 'completed',
                    'name' => 'Completed'
                ],
                [
                    'idt' => 'completed_and_approved',
                    'name' => 'Completed and Approved'
                ]
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('task_statuses');
    }
}
