import React from "react";
import { Task, TaskStatus } from "@/types";
import { format } from "date-fns";
import { capitalizeFirstChar } from "@/utils/stringUtils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Tick02Icon,
  CancelCircleIcon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import { Loader } from "@/components/ui/loader";
import Link from "next/link";

interface TaskItemProps {
  task: Task;
}

interface StatusIconConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any; // HugeIcons IconSvgObject type
  color?: string;
  useLoader?: boolean;
}

const STATUS_CONFIGS: Record<TaskStatus, StatusIconConfig> = {
  [TaskStatus.COMPLETED]: {
    icon: Tick02Icon,
    color: "text-[#4ade80]",
  },
  [TaskStatus.RUNNING]: {
    useLoader: true,
  },
  [TaskStatus.NEEDS_HELP]: {
    icon: AlertCircleIcon,
    color: "text-[#f59e0b]",
  },
  [TaskStatus.PENDING]: {
    useLoader: true,
  },
  [TaskStatus.FAILED]: {
    icon: AlertCircleIcon,
    color: "text-zen-grey-mid-1",
  },
  [TaskStatus.NEEDS_REVIEW]: {
    icon: AlertCircleIcon,
    color: "text-[#f59e0b]",
  },
  [TaskStatus.CANCELLED]: {
    icon: CancelCircleIcon,
    color: "text-zen-grey-mid-2",
  },
};

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  // Format date to match the screenshot (e.g., "Today 9:13am" or "April 13, 2025, 12:01pm")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const formatString = isToday ? `'Today' h:mma` : "MMMM d, yyyy h:mma";

    const formatted = format(date, formatString).toLowerCase();
    return capitalizeFirstChar(formatted);
  };

  const StatusIcon = ({ status }: { status: TaskStatus }) => {
    const config = STATUS_CONFIGS[status];
    if (!config) return null;

    const { icon, color, useLoader } = config;

    if (useLoader) {
      return (
        <div className="flex items-center justify-center">
          <Loader size={16} />
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center">
        <HugeiconsIcon icon={icon} className={`h-5 w-5 ${color}`} />
      </div>
    );
  };

  return (
    <Link href={`/tasks/${task.id}`} className="block">
      <div className="glass hover:shadow-lg hover:bg-zen-white-1-80 flex min-h-24 items-start rounded-lg border border-zen-grey-light-2 p-5 transition-all duration-300">
        <div className="mb-0.5 flex-1 space-y-2">
          <div className="flex items-center justify-start space-x-2">
            <StatusIcon status={task.status} />
            <div className="text-zen-grey-dark-2 text-sm font-medium">
              {capitalizeFirstChar(task.description)}
            </div>
          </div>
          <div className="ml-7 flex items-center justify-start space-x-1.5 text-xs">
            <span className="text-zen-grey-mid-2">
              {formatDate(task.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
