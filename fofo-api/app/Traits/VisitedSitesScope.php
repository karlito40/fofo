<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;
use App\Models\Page;

trait VisitedSitesScope
{

    public function scopeVisitedSites($query)
    {
        return $query->select(
            'sites.id',
            'sites.domain',
            DB::raw('MAX(visites.viewed_at) as viewed_at'),
            DB::raw('MAX(visites.user_id) as user_id'),
            DB::raw('MAX(comments.id) as has_new_comment')
        )
            ->join('pages', 'pages.id', '=', 'visites.page_id')
            ->join('sites', 'sites.id', '=', 'pages.site_id')
            ->leftJoin('comments', function ($join) {
                $join->on('comments.commentable_id', '=', 'pages.id')
                    ->where('comments.commentable_type', '=', Page::class)
                    ->whereRaw('comments.created_at > visites.viewed_at');

            })
            ->groupBy('sites.id')
            ->orderByDesc('viewed_at');
    }
}