<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case PENDING = 'pending';
    case INPROGRESS = 'in_progress';
    case COMPLETED = 'completed';
}
