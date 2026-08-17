import { FullProjectRecord, ProjectHealthStatus } from '../types';

export class ProjectHealthService {
  /**
   * Evaluates deterministic health status for a project based on task delays, blocked items,
   * milestone target dates, and risks.
   */
  public static evaluateProjectHealth(project: Partial<FullProjectRecord>): ProjectHealthStatus {
    if (project.status === 'COMPLETED') return 'COMPLETED';
    if (project.status === 'CANCELLED' || project.status === 'ON_HOLD') return 'AT_RISK';

    const now = new Date();
    const tasks = project.tasks || [];
    const milestones = project.milestones || [];
    const risks = project.risks || [];

    // Check for blocked critical tasks
    const blockedTasks = tasks.filter((t) => t.status === 'BLOCKED');
    if (blockedTasks.length >= 2) {
      return 'BLOCKED';
    }

    // Check target date overdue
    if (project.targetDate) {
      const targetDate = new Date(project.targetDate);
      if (targetDate < now && (project.overallProgress || 0) < 100) {
        return 'DELAYED';
      }
    }

    // Check delayed critical milestones
    const delayedMilestones = milestones.filter(
      (m) => m.status === 'DELAYED' || (m.status !== 'COMPLETED' && new Date(m.dueDate) < now)
    );
    if (delayedMilestones.length > 0) {
      return 'DELAYED';
    }

    // Check overdue tasks count
    const overdueTasks = tasks.filter(
      (t) => t.status !== 'DONE' && t.status !== 'CANCELLED' && new Date(t.dueDate) < now
    );

    // High critical risks
    const criticalRisks = risks.filter((r) => r.status === 'ACTIVE' && (r.severity === 'CRITICAL' || r.severity === 'HIGH'));

    if (overdueTasks.length > 3 || criticalRisks.length >= 2) {
      return 'DELAYED';
    }

    if (overdueTasks.length >= 1 || blockedTasks.length === 1 || criticalRisks.length === 1) {
      return 'AT_RISK';
    }

    return 'ON_TRACK';
  }
}
