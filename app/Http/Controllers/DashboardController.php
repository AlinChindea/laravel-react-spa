<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalPendingTasks = Task::where('status', 'open')->count();
        $usersPendingTasks = Task::where('status', 'open')->where('assigned_to', auth()->user()->id)->count();
        $totalOngoingTasks = Task::where('status', 'in_progress')->count();
        $usersOngoingTasks = Task::where('status', 'in_progress')->where('assigned_to', auth()->user()->id)->count();
        $totalCompletedTasks = Task::where('status', 'completed')->count();
        $usersCompletedTasks = Task::where('status', 'completed')->where('assigned_to', auth()->user()->id)->count();
        return inertia('Dashboard', [
            'totalPendingTasks' => $totalPendingTasks,
            'usersPendingTasks' => $usersPendingTasks,
            'totalOngoingTasks' => $totalOngoingTasks,
            'usersOngoingTasks' => $usersOngoingTasks,
            'totalCompletedTasks' => $totalCompletedTasks,
            'usersCompletedTasks' => $usersCompletedTasks,
        ]);
    }
}
