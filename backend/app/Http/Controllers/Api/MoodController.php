<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            [
                'id' => 1,
                'record_date' => '2026-08-06',
                'mood_score' => 4,
                'condition_score' => 3,
                'memo' => '散歩した'
            ],
            [
                'id' => 2,
                'record_date' => '2026-08-05',
                'mood_score' => 2,
                'condition_score' => 2,
                'memo' => '疲れた'
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
