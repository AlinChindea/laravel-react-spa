<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user_id = auth()->user()->id;
        $totalPendingTasks = Task::where('status', 'open')->count();
        $usersPendingTasks = Task::where('status', 'open')->where('assigned_to', $user_id)->count();
        $totalOngoingTasks = Task::where('status', 'in_progress')->count();
        $usersOngoingTasks = Task::where('status', 'in_progress')->where('assigned_to', $user_id)->count();
        $totalCompletedTasks = Task::where('status', 'completed')->count();
        $usersCompletedTasks = Task::where('status', 'completed')->where('assigned_to', $user_id)->count();
        $activeTasks = TaskResource::collection(
            Task::whereIn('status', ['open', 'in_progress'])
                ->where('assigned_to', $user_id)
                ->limit(10)
                ->get()
        );

        return inertia('Dashboard', [
            'totalPendingTasks' => $totalPendingTasks,
            'usersPendingTasks' => $usersPendingTasks,
            'totalOngoingTasks' => $totalOngoingTasks,
            'usersOngoingTasks' => $usersOngoingTasks,
            'totalCompletedTasks' => $totalCompletedTasks,
            'usersCompletedTasks' => $usersCompletedTasks,
            'activeTasks' => $activeTasks,
        ]);
    }
}
