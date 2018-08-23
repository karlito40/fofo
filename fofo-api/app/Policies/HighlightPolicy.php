<?php

namespace App\Policies;

use App\User;
use App\Models\Highlight;
use Illuminate\Auth\Access\HandlesAuthorization;

class HighlightPolicy
{
    use HandlesAuthorization;



    /**
     * Determine whether the user can create highlights.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the highlight.
     *
     * @param  \App\User  $user
     * @param  \App\Models\Highlight  $highlight
     * @return mixed
     */
    public function update(User $user, Highlight $highlight)
    {
        return $user->id === $highlight->user_id;
    }

    /**
     * Determine whether the user can delete the highlight.
     *
     * @param  \App\User  $user
     * @param  \App\Models\Highlight  $highlight
     * @return mixed
     */
    public function delete(User $user, Highlight $highlight)
    {
        return $user->id === $highlight->user_id;
    }

    /**
     * Determine whether the user can restore the highlight.
     *
     * @param  \App\User  $user
     * @param  \App\Models\Highlight  $highlight
     * @return mixed
     */
    public function restore(User $user, Highlight $highlight)
    {
        return $user->id === $highlight->user_id;
    }

    /**
     * Determine whether the user can permanently delete the highlight.
     *
     * @param  \App\User  $user
     * @param  \App\Models\Highlight  $highlight
     * @return mixed
     */
    public function forceDelete(User $user, Highlight $highlight)
    {
        return $user->id === $highlight->user_id;
    }
}
