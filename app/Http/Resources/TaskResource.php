<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'deadline' => (new Carbon($this->due_date))->format('d-m-Y'),
            'status' => $this->status,
            'priority' => $this->priority,
            'image_path' => $this->image_path,
            'project' => new ProjectResource($this->project),
            'assigned_user' => $this->assignedTo ? new UserResource($this->assignedTo) : null,
            'updated_by' => new UserResource($this->updatedBy),
            'created_by' => new UserResource($this->createdBy),
            'created_at' => (new Carbon($this->created_at))->format('d-m-Y'),
            'updated_at' => (new Carbon($this->updated_at))->format('d-m-Y H:i:s'),
        ];
    }
}
