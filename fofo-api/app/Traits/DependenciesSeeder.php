<?php

namespace App\Traits;

use Illuminate\Support\Facades\Log;

trait DependenciesSeeder
{
    public function run()
    {
        Log::debug(static::class . '::run');
        $this->loadDependencies();

        Log::debug(static::class . '::runWithDeps');
        $this->runWithDeps();
    }

    protected function loadDependencies()
    {
        Log::debug(static::class . '::loadDependencies ', $this->dependencies);
        if(!isset($this->dependencies)) {
            return;
        }

        foreach($this->dependencies as $var => $dependency)
        {
            $this->{$var} = call_user_func($dependency['Model'] .'::all');
            if($this->{$var}->isEmpty()) {
                $this->call($dependency['Seeder']);
                $this->{$var} = call_user_func($dependency['Model'] .'::all');
            }

            $take = min($this->{$var}->count(), 20);
            $this->{$var} = $this->{$var}->random($take);
        }
    }
}