<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Form;



class addNewFormTest extends TestCase
{
    use RefreshDatabase;
  


    public function test_addNewForm(){

                            
                            $response = $this->postJson('/api/new', ['name' => 'form name']);
                            $response->assertStatus(200);
    }
}
