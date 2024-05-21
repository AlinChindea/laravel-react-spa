<?php

namespace App\Http\Requests;

use App\Enums\TASKPRIORITY;
use App\Enums\TaskStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'max:255'],
            'image' => ['nullable', 'image', 'max:1024'],
            'description' => ['nullable', 'string'],
            'due_date' => ['nullable', 'date'],
            'project_id' => ['required', 'exists:projects,id'],
            'assigned_to' => ['required', 'exists:users,id'],
            'status' => ['required', Rule::enum(TaskStatus::class)],
            'priority' => ['required', Rule::enum(TaskPriority::class)],
        ];
    }
}
