<?php

class CommonMigrations
{
    public static function five($table)
    {
        $table->boolean('status')->default(true)->nullable();
        $table->bigInteger('created_by')->nullable();
        $table->bigInteger('updated_by')->nullable();
        $table->timestamps();
    }

    public static function insertEntityPermissions($title, $slug, $plural_s_es) 
    {
        DB::table('permissions')
        ->insert([
            [
                'group' => $title . $plural_s_es . ' Management',
                'idt' => $slug . $plural_s_es . '_list',
                'name' => $title . $plural_s_es . ' List',
            ],
            [
                'group' => $title . $plural_s_es . ' Management',
                'idt' => 'add_'. $slug,
                'name' => 'Add ' . $title
            ],
            [
                'group' => $title . $plural_s_es . ' Management',
                'idt' => 'edit_'. $slug,
                'name' => 'Edit ' . $title
            ],
            [
                'group' => $title . $plural_s_es . ' Management',
                'idt' => 'delete_'. $slug,
                'name' => 'Delete ' . $title
            ],
        ]);
    }
}