<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permissions', function (Blueprint $table) {
            $table->bigIncrements('id');
            
            $table->string('group');
            $table->string('idt');
            $table->string('name');

            $table->timestamps();
        });

        CommonMigrations::insertEntityPermissions('Role', 'role', 's');
        CommonMigrations::insertEntityPermissions('User', 'user', 's');
        
        
        $title = 'Task';
        $slug = 'task';
        $plural_s_es = 's';
        CommonMigrations::insertEntityPermissions($title, $slug, $plural_s_es);
        DB::table('permissions')
            ->insert([
                [
                    'group' => $title . $plural_s_es . ' Management',
                    'idt' => 'has_access_to_other_users_tasks',
                    'name' => 'Has Access To Other Users Tasks',
                ],
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('permissions');
    }
}
