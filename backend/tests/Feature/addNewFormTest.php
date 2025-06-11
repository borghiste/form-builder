<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Form;
use illuminate\Http\Request;


class addNewFormTest extends TestCase
{
    /**
     * A basic feature test example.
     */


    public function test_addNewForm(){

                            
                            $response = $this->postJson('/api/new', ['name' => 'form name']);
                            $response->assertStatus(200);
    }
}
