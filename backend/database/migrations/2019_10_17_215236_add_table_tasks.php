<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTableTasks extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->bigIncrements('id');
            
            $table->string('task_title');
            $table->string('task_description')->nullable();
            $table->datetime('due_date');
            $table->bigInteger('assigned_to');
            $table->bigInteger('assigned_by');
            $table->integer('task_status_id');

            CommonMigrations::five($table);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
