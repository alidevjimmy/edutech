<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class info extends Model
{
    protected $fillable = [
      'name',
      'family',
      'description',
      'phone'
    ];
}
