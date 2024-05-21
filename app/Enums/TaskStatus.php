<?php

namespace App\Enums;

enum TaskStatus: string
{
    case OPEN = 'open';
    case INPROGRESS = 'in_progress';
    case COMPLETED = 'completed';
    case CLOSED = 'closed';
}
