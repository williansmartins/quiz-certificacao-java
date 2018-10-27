<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class QuestoesUpdateSize extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('questoes', function (Blueprint $table) {
            $table->longText('titulo')->change();
	        $table->longText('descricao')->change();
	        $table->longText('resposta1')->change();
	        $table->longText('resposta2')->change();
	        $table->longText('resposta3')->change();
	        $table->longText('resposta4')->change();
	        $table->longText('resposta5')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('questoes', function (Blueprint $table) {
	        $table->string('titulo')->change();
	        $table->string('descricao')->change();
	        $table->string('resposta1')->change();
	        $table->string('resposta2')->change();
	        $table->string('resposta3')->change();
	        $table->string('resposta4')->change();
	        $table->string('resposta5')->change();
        });
    }
}
